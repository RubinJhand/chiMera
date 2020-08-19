import React, { useState, useEffect } from 'react';

import './Workspace.scss';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import GalleryCanvas from './GalleryCanvas';

function PresentCanvas(props) {
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      outline: 'none'
    },
    modal: {
      outline: 0
    }
  }));

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <div className={classes.modal}>
      <Modal
        open={props.openModal}
        onClose={() => props.closeModal(false)}
        className={classes.modal}
      >
        <div className='workspace'>
          <GalleryCanvas media={props.media} mediaBox={props.mediaBox} />
        </div>
      </Modal>
    </div>
  );
}

export default PresentCanvas;
