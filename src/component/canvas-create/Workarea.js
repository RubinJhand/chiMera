import React, { useRef } from 'react';
import firebase from 'firebase';

import DatabaseUpload from '../DatabaseUpload';
import Workspace from './Workspace';

import './Workspace.scss';

import AddIcon from '@material-ui/icons/Add';

function Workarea(props) {
  const user = firebase.auth().currentUser;

  const refPass = useRef();

  return (
    <div>
      <div className='toolbar'>
        <div
          style={{
            color: 'white',
            marginLeft: 5,
            marginRight: 10,
            marginTop: 4,
            fontSize: 18
          }}
        >
          Click or Drag to add Content to the Canvas
        </div>
        <div
          onClick={() => refPass.current.passMessage()}
          className='droppable-element'
          draggable={true}
          unselectable='on'
          onDragStart={(e) => e.dataTransfer.setData('text/plain', '')}
        >
          <AddIcon
            style={{
              color: 'white',
              fontSize: '30px',
              cursor: 'pointer',
              marginRight: 20
            }}
          />
        </div>
        {/* <div className='save'>Save</div> */}

        {!user ? (
          <div style={{ marginRight: 0 }}>Sign in to Save your work</div>
        ) : (
          <DatabaseUpload
            className='save'
            createGallery={props.createGallery}
            setMode={props.setMode}
            mode={props.mode}
            panel_id={props.panel_id}
            counter={props.counter}
          />
        )}
      </div>
      <Workspace
        ref={refPass}
        media={props.media}
        mediaBox={props.mediaBox}
        counter={props.counter}
      />
    </div>
  );
}

export default Workarea;
