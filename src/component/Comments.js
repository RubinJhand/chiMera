import React, { useState, useEffect, forwardRef } from 'react';

import firebase from 'firebase';
import { db } from '../config/firebase';

import { Button, Input } from '@material-ui/core';

import './Panels.scss';

import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN01TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n01';

import FlipMove from 'react-flip-move';

const Comments = forwardRef((props, ref) => {
  const user = firebase.auth().currentUser;
  const [modalStyle] = useState(getModalStyle);

  function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }

  const { panel_id } = props;
  // comments state
  const [comments, setComments] = useState([]);
  const [remark, setRemark] = useState('');

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // comment save
  const saveRemark = (event) => {
    event.preventDefault();
    db.collection('panels').doc(panel_id).collection('comments').add({
      remark: remark,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setRemark('');
  };

  //db update when new comment (onSnapshot)
  useEffect(() => {
    let done;
    if (panel_id) {
      done = db
        .collection('panels') //reference to firebase collection name
        .doc(panel_id) //the panel id in firebase
        .collection('comments') //the comments section (collection in firebase speak) in the panels collection
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          //everytime there is a change in the db, setComments state to the values mapped back locally
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      done(); //run the 'done' function (see done = db above)
    };
  }, [panel_id]); //reset useEffect so it will run again everytime panel_id changes

  //converts server time to people time
  const dateConversion = (seconds) => {
    if (seconds) {
      return new Date(seconds.toDate()).toUTCString();
    }
    return 0;
  };

  return (
    <>
      <CardContent ref={ref}>
        <Divider />

        <form className='comments__form'>
          <Input
            type='text'
            placeholder='Add comment'
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />

          <Button type='submit' disabled={!remark} onClick={saveRemark}>
            Add
          </Button>
        </form>
      </CardContent>

      <CardContent>
        <FlipMove>
          {comments.map((comment) => (
            <>
              <Divider />
              <TextInfoContent
                useStyles={useN01TextInfoContentStyles}
                overline={dateConversion(comment.timestamp)}
                heading={comment.username}
                body={comment.remark}
              />
            </>
          ))}
        </FlipMove>
      </CardContent>
    </>
  );
});

export default Comments;
