import React, { useState, useEffect } from 'react';

import firebase from 'firebase';
import { authorize } from '../config/firebase';

import Title from '../component/Title';

import './authUser.css';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';

function UserAuth(props) {
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
  const [signIn, setSignIn] = useState(false);
  const [username, setUserName] = useState(props.userName || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = authorize.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  const signUp = (event) => {
    event.preventDefault();
    authorize
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        });
      })
      .catch((error) => alert(error.message));

    setOpen(false);
    props.menuSelect('HOME');
  };

  const enterApp = (event) => {
    event.preventDefault();
    authorize
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setSignIn(false);
    props.menuSelect('HOME');
  };

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='chimera__signup'>
            <Title text='chiMera' />

            <Input
              placeholder='username'
              type='text'
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signUp}>
              Signup
            </Button>
          </form>
        </div>
      </Modal>

      <Modal open={signIn} onClose={() => setSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='chimera__signup'>
            <Title text='chiMera' />

            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={enterApp}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>

      {user ? (
        <>
          <Button
            onClick={() => authorize.signOut()}
            style={{ color: 'black', marginLeft: 14, align: 'center' }}
          >
            {firebase.auth().currentUser.displayName}
          </Button>
        </>
      ) : (
        <div className='chimera__loginContainer'>
          <Button
            style={{ color: 'black', marginLeft: 14 }}
            onClick={() => setSignIn(true)}
          >
            Sign In
          </Button>
          <Button style={{ color: 'black' }} onClick={() => setOpen(true)}>
            Register
          </Button>
        </div>
      )}
    </div>
  );
}

export default UserAuth;
