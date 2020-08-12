import React, { useState, useEffect } from "react";
import "./App.scss";
import IconButton from "@material-ui/core/Button";
import ImageIcon from "@material-ui/icons/Image";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ImageRow from "./ImageRow";
import VideoRow from "./VideoRow";
import AudioRow from "./AudioRow";
import TextRow from "./TextRow";

const Mediaform = (props) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  // useEffect(() => {
  //   if (type === "TEXT") {
  //     props.setMode(type);
  //   }
  // }, [type]);

  const handleClose = () => {
    setOpen(false);
  };

  const submitURL = () => {
    setOpen(false);
    props.setMode(type);
    props.fireTrigger("!");
  };

  return (
    <div className="selection-box">
      <IconButton
        color="primary"
        aria-label="image"
        onClick={() => {
          handleClickOpen();
          setType("IMAGE");
        }}
      >
        <ImageIcon fontSize="large" />
      </IconButton>
      <IconButton
        color="primary"
        aria-label="video"
        onClick={() => {
          handleClickOpen();
          setType("VIDEO");
        }}
      >
        <VideoCallIcon fontSize="large" />
      </IconButton>
      <IconButton
        color="primary"
        aria-label="audio"
        onClick={() => {
          handleClickOpen();
          setType("AUDIO");
        }}
      >
        <AudiotrackIcon fontSize="large" />
      </IconButton>
      <IconButton
        color="primary"
        aria-label="text"
        onClick={() => {
          handleClickOpen();
          setType("TEXT");
        }}
      >
        <TextFieldsIcon fontSize="large" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {type === "IMAGE" && (
          <ImageRow setContent={props.setContent} submitUrl={submitURL} />
        )}
        {type === "VIDEO" && (
          <VideoRow setContent={props.setContent} submitUrl={submitURL} />
        )}
        {type === "AUDIO" && (
          <AudioRow setContent={props.setContent} submitUrl={submitURL} />
        )}
        <DialogContent>
          {type === "IMAGE" && (
            <DialogContentText>
              Search and select an image above or add an image from anywhere on
              the internet by copy/pasting the source url. (Right click on the
              image and click "Copy image address" then paste it below.)
            </DialogContentText>
          )}
          {type === "VIDEO" && (
            <DialogContentText>
              You can add video from anywhere on the internet. Just copy and
              paste the video source url.
            </DialogContentText>
          )}
          {type === "AUDIO" && (
            <DialogContentText>
              You can add audio from anywhere on the internet. Just copy and
              paste the audio source url.
            </DialogContentText>
          )}
          {type === "TEXT" && (
            <TextRow setContent={props.setContent} submitUrl={submitURL} />
          )}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Source url"
            type="url"
            onChange={(event) => props.setContent(event.target.value)}
            fullWidth
          />
          <Button onClick={submitURL} color="primary">
            Submit
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Mediaform;
