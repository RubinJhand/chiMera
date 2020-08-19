import React, { useState } from 'react';

import firebase from 'firebase';
import { storage } from '../config/firebase';

import Title from './Title';

import '../App.scss';
import './MediaStorage.css';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';

function MediaStorage(props) {
  const user = firebase.auth().currentUser;

  const { panel_id } = props;

  const [progress, setProgress] = useState(0);
  const [media, setMedia] = useState('');
  const [url, setUrl] = useState('');
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [error, setError] = useState('');

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
    },
    button: {
      margin: theme.spacing(1)
    },
    input: {
      margin: theme.spacing(1)
    }
  }));

  const classes = useStyles();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (media) {
      const uploadTask = storage.ref(`panels/${media.name}`).put(media);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          setError(error);
        },
        () => {
          storage
            .ref('panels')
            .child(media.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              setUrl(url);
              setProgress(0);
              setOpen(false);
              props.setContent(url);
              props.submitURL();
            });
        }
      );
    } else {
      setError('Error please choose an media to upload');
    }
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <Title text='chiMera' />
          <>{progress > 0 ? <progress value={progress} max='100' /> : ''}</>
          <form className='chimera__signup'>
            <form>
              <Input color='primary' type='file' onChange={handleChange} />
              <Input
                placeholder='None'
                type='hidden'
                // value={media}
                onChange={(event) => setMedia(event.target.value)}
              />
              <Button color='primary' type='submit' onClick={handleUpload}>
                SAVE
              </Button>
            </form>
          </form>
        </div>
      </Modal>

      <Button
        style={{ marginLeft: '8' }}
        color='primary'
        onClick={() => setOpen(true)}
      >
        UPLOAD!
      </Button>
    </>
  );
}

export default MediaStorage;
