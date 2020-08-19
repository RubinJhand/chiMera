import React from 'react';

import DeletePanel from '../DeletePanel';

import './Workspace.scss';

import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';

function Toolbar(props) {
  return (
    <>
      <div className='toolbar2'>
        <div
          style={{
            color: 'white',
            marginLeft: 20,
            marginRight: 'auto',
            marginTop: 4,
            fontSize: 20,
            fontStyle: 'Bold'
          }}
        >
          {props.canvasName}
        </div>
        <Button
          variant='contained'
          color='primary'
          style={{ color: 'white', marginRight: 20 }}
          onClick={() => {
            props.setMode('EDITCANVAS');
          }}
        >
          EDIT
        </Button>{' '}
        <DeletePanel
          username={props.userName}
          panel_id={props.panel_id}
          setMode={props.setMode}
          mode={props.mode}
        />
        <IconButton
          variant='contained'
          color='primary'
          style={{ color: 'white' }}
          onClick={() => alert(props.panel_id)}
        >
          <ShareIcon />
        </IconButton>
      </div>
    </>
  );
}

export default Toolbar;
