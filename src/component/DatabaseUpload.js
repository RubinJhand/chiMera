import React, { useState } from 'react';

import firebase from 'firebase';
import { db } from '../config/firebase';

import Title from './Title';
import { saveMedia } from './canvas-create/Canvas';

import '../auth/authUser.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input, Modal } from '@material-ui/core';

function DatabaseUpload(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const user = firebase.auth().currentUser;

  function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  }));

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleUpload = (e) => {
    if (props.mode === 'EDITCANVAS') {
      props.setMode('LOADINGCANVAS');
      db.collection('panels')
        .doc(props.panel_id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
        })
        .then(() => {
          db.collection('panels')
            .add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              title: title,
              mediaBox: [...saveMedia[0].items],
              mediaCounter: saveMedia[0].newCounter,
              media: [...saveMedia[1]],
              username: user.displayName,
              description: description,
              music_id: ''
            })
            .then(function (docRef) {
              props.createGallery(
                saveMedia[1],
                saveMedia[0].items,
                title,
                user.displayName,
                docRef.id,
                saveMedia[0].newCounter
              );
              props.setMode('CREATEDCANVAS');
            })
            .catch(function (error) {
              console.error('Error adding document: ', error);
            });
          setOpen(false);
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    } else {
      props.setMode('LOADINGCANVAS');

      db.collection('panels')
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          title: title,
          mediaBox: [...saveMedia[0].items],
          mediaCounter: saveMedia[0].newCounter,
          media: [...saveMedia[1]],
          username: user.displayName,
          description: description,
          music_id: ''
        })
        .then(function (docRef) {
          props.createGallery(
            saveMedia[1],
            saveMedia[0].items,
            title,
            user.displayName,
            docRef.id,
            saveMedia[0].newCounter
          );
          props.setMode('CREATEDCANVAS');
        })
        .catch(function (error) {
          console.error('Error adding document: ', error);
        });
      setOpen(false);
    }
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='chimera__signup'>
            <Title text='chiMera' />

            <Input
              placeholder='Title'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              placeholder='Description'
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              onClick={() => {
                handleUpload();
              }}
            >
              Publish!
            </Button>
          </form>
        </div>
      </Modal>
      <Button
        variant='contained'
        color='primary'
        style={{ color: 'white', marginLeft: 'auto' }}
        onClick={() => setOpen(true)}
      >
        SAVE
      </Button>
    </>
  );
}

export default DatabaseUpload;
