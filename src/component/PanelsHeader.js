import React from 'react';

import './Panels.scss';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import { purple } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxHeight: 20,
    color: '#fff'
  },
  avatar: {
    backgroundColor: purple[900],
    color: '#fff'
  }
}));

//converts server time to people time
const dateConversion = (seconds) => {
  if (seconds) {
    return seconds.toDate().toDateString();
  }
  return 0;
};

function PanelsHeader(props) {
  const { username, title, time } = props;

  const classes = useStyles();

  return (
    <>
      <CardHeader
        avatar={<Avatar className={classes.avatar}>{username[0]}</Avatar>}
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={dateConversion(time)}
      />
    </>
  );
}

export default PanelsHeader;
