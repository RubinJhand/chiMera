import React from 'react';

import { Card, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 2000,
    height: '100%',
    backgroundPosition: 'center'
  },
  media: {
    height: '100%',
    width: '100%',
    objectFit: 'cover'
  }
});

function Image(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={props.content}
        component='image'
        title={'Try another source'}
      />
    </Card>
  );
}

export default Image;
