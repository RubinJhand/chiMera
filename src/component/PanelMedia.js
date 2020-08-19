import React, { useState } from 'react';

import Image from './canvas-create/media/Image';
import Video from './canvas-create/media/Video';
import Audio from './canvas-create/media/Audio';
import Text from './canvas-create/media/Text';

import './Panels.scss';
import './canvas-create/Workspace.scss';

import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { GridList, GridListTile, Box } from '@material-ui/core';

function PanelMedia(props) {
  const { media, mediaBox } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: 5,
      display: 'flex',
      flexWrap: 'wrap',
      // justifyContent: 'space-around',
      overflow: 'hidden'
    },
    media: {
      paddingTop: '1%',
      backgroundColor: '#424242'
    },
    description: {
      // height: 0,
      paddingTop: '56.25%'
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: 'rotate(180deg)'
    },
    like: {
      color: red[500]
    },
    gridList: {
      width: 500,
      height: 350,
      overflow: 'scroll'
    }
  }));

  //Cards material ui

  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let sizeCount = 0;
  let count = 0;

  const mathTime = (w, h, sizeCount) => {
    let width = 1;
    let wide = 1;
    if (sizeCount % 2 === 0) {
      width = 1;
      wide = w > h * 1.1 ? 2 : 1;
      w > 8 ?? (width = 2);
    }
    return { width: width, wide: wide };
  };

  if (media.length === 1) {
    return (
      <Box container className={classes.root}>
        <GridList
          cellHeight={255}
          className={classes.gridList}
          cols={1}
          spacing={0}
        >
          {media.map(({ mediaUrl, mediaType, mediaBox_id }) =>
            mediaBox.map(({ i, h, w, x, y }) => {
              if (mediaBox_id === i) {
                let width = 1;
                let wide = 1;

                return (
                  <GridListTile
                    key={mediaBox_id}
                    xs={width}
                    cols={wide}
                    rows={0}
                    spacing={0}
                  >
                    {mediaType === 'TEXT' && <Text content={mediaUrl} />}
                    {mediaType === 'VIDEO' && <Video content={mediaUrl} />}
                    {mediaType === 'IMAGE' && <Image content={mediaUrl} />}
                    {mediaType === 'AUDIO' && <Audio content={mediaUrl} />}
                  </GridListTile>
                );
              }
            })
          )}
        </GridList>
      </Box>
    );
  }

  if (media.length === 2) {
    return (
      <Box container className={classes.root}>
        <GridList
          cellHeight={125}
          className={classes.gridList}
          cols={2}
          spacing={0}
        >
          {media.map(({ mediaUrl, mediaType, mediaBox_id }) =>
            mediaBox.map(({ i, h, w, x, y }) => {
              if (mediaBox_id === i) {
                let width = 2;
                let wide = 2;

                return (
                  <GridListTile
                    key={mediaBox_id}
                    xs={width}
                    cols={wide}
                    spacing={0}
                  >
                    {mediaType === 'TEXT' && <Text content={mediaUrl} />}
                    {mediaType === 'VIDEO' && <Video content={mediaUrl} />}
                    {mediaType === 'IMAGE' && <Image content={mediaUrl} />}
                    {mediaType === 'AUDIO' && <Audio content={mediaUrl} />}
                  </GridListTile>
                );
              }
            })
          )}
        </GridList>
      </Box>
    );
  }

  return (
    <Box container className={classes.root}>
      <GridList
        cellHeight={180}
        className={classes.gridList}
        cols={media.length > 6 ? 3 : 2}
        spacing={0}
      >
        {media.map(({ mediaUrl, mediaType, mediaBox_id }) =>
          mediaBox.map(({ i, h, w, x, y }) => {
            if (mediaBox_id === i) {
              let dimensions = mathTime(w, h, sizeCount);
              count += 1;
              count === 1 && Math.random() < 0.5 && media.length === 3
                ? (dimensions.wide = 2)
                : (dimensions.wide += 0);
              count === media.length && sizeCount % 2 === 0
                ? (dimensions.wide = 2)
                : (dimensions.wide += 0);
              dimensions.width === 2 || dimensions.wide === 2
                ? (sizeCount += 2)
                : (sizeCount += 1);
              media.length > 6
                ? (dimensions = { wide: 1, width: 1 })
                : (sizeCount += 0);

              return (
                <GridListTile
                  key={mediaBox_id}
                  xs={dimensions.width}
                  cols={dimensions.wide}
                  spacing={0}
                >
                  {mediaType === 'TEXT' && (
                    <div>
                      <Text content={mediaUrl} />
                    </div>
                  )}
                  {mediaType === 'VIDEO' && <Video content={mediaUrl} />}
                  {mediaType === 'IMAGE' && <Image content={mediaUrl} />}
                  {mediaType === 'AUDIO' && <Audio content={mediaUrl} />}
                </GridListTile>
              );
            }
          })
        )}
      </GridList>
    </Box>
  );
}

export default PanelMedia;
