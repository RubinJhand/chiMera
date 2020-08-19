import React, { useState } from 'react';
import firebase from 'firebase';

import PanelMedia from './PanelMedia';
import PanelsHeader from './PanelsHeader';
import Comments from './Comments';

import './Panels.scss';
import './canvas-create/Workspace.scss';

import {
  CardContent,
  GridList,
  Box,
  GridListTile,
  Menu,
  CardActions,
  IconButton,
  Paper
} from '@material-ui/core';

import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import clsx from 'clsx';

import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonIcon from '@material-ui/icons/Person';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VisibilityIcon from '@material-ui/icons/Visibility';

import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN01TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n01';

function Panels(props) {
  const {
    title,
    description,
    time,
    media,
    mediaBox,
    mediaCounter,
    panel_id,
    username,
    id
  } = props;

  const user = firebase.auth().currentUser;

  const useStyles = makeStyles((theme) => ({
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
    avatar: {
      backgroundColor: red[500]
    },
    like: {
      color: '#FC766AFF'
    },
    root_grid: {
      flexGrow: 1
    },
    paper: {
      color: theme.palette.text.secondary
    },
    gridlist__root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden'
    },
    gridList: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)'
    },
    gridlist__title: {
      color: theme.palette.primary.light
    },
    gridlist__titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
    }
  }));

  //Cards material ui
  const [like, setLike] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box container className='panels'>
      <Paper elevation={24}>
        <GridList
          cellHeight='auto'
          rows={12}
          cols={1}
          className={classes.gridlist}
        >
          <GridListTile
            rows={2}
            cols={1}
            onClick={() => {
              let name = '';
              user && (name = user.displayName);
              if (name === username) {
                props.setMode('LOADINGCANVAS');
                setTimeout(() => {
                  props.setMode('CREATEDCANVAS');
                }, 3000);
                props.createGallery(
                  media,
                  mediaBox,
                  title,
                  username,
                  panel_id,
                  mediaCounter
                );
                window.scrollTo({
                  top: 45,
                  left: 0,
                  behavior: 'smooth'
                });
              } else {
                props.openModal(media, mediaBox, title);
              }
              !user && props.openModal(media, mediaBox, title);
            }}
            style={{ cursor: 'pointer' }}
          >
            <PanelsHeader username={username} title={username} time={time} />
          </GridListTile>

          <GridListTile rows={4} cols={1}>
            <div className='card-grid-display'>
              <PanelMedia
                media={media}
                mediaBox={mediaBox}
                mediaCounter={mediaCounter}
              />
            </div>
          </GridListTile>

          <GridListTile rows={4} cols={1}>
            <CardContent>
              <TextInfoContent
                useStyles={useN01TextInfoContentStyles}
                overline={''}
                heading={title}
                body={description}
              />
            </CardContent>
          </GridListTile>

          <GridListTile rows={2} cols={1}>
            <CardActions disableSpacing>
              {!like ? (
                <IconButton
                  aria-label='add to favorites'
                  onClick={(e) => setLike(true)}
                >
                  <FavoriteIcon />
                </IconButton>
              ) : (
                <IconButton
                  aria-label='add to favorites'
                  onClick={(e) => setLike(false)}
                >
                  <FavoriteBorderIcon className={classes.like} />
                </IconButton>
              )}

              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded
                })}
                onClick={handleClick}
                aria-expanded={expanded}
                aria-label='show more'
              >
                <CommentIcon style={{ color: '#f5ba55' }} />
              </IconButton>
            </CardActions>
          </GridListTile>

          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {!user ? (
              <h6>Sign In to Join Us!</h6>
            ) : (
              <Comments
                key={panel_id}
                username={username}
                panel_id={panel_id}
                key={id}
              />
            )}
          </Menu>
        </GridList>
      </Paper>
    </Box>
  );
}

export default Panels;
