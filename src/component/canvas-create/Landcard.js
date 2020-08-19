import React from 'react';

import Title from '../Title';

import './Workspace.scss';

import Button from '@material-ui/core/Button';

function Landcard(props) {
  return (
    <div className='landcard'>
      Welcome to chiMera.
      <div>Create something.</div>
      <div>Create something... </div>
      <div className='landcard__start'>
        <Title text={'weird'} />
        <Button
          onClick={() => {
            props.getStarted();
            props.setMedia([]);
            props.setMediaBox();
          }}
          style={{ marginRight: 165, marginLeft: 100, margin: 50 }}
          variant='contained'
          color='secondary'
        >
          Get Started
        </Button>
      </div>
      <img
        src='https://i.imgur.com/6YtyiMy.png'
        alt='tree'
        className='chimera'
      ></img>
    </div>
  );
}

export default Landcard;
