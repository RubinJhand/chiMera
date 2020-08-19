import React, { useState, useEffect, useRef, Fragment } from 'react';

import axios from '../axios';
import querystring from 'querystring';

import '../Row.scss';

import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import PageviewIcon from '@material-ui/icons/Pageview';
import Button from '@material-ui/core/Button';

const API_KEY = process.env.REACT_APP_SPOTIFY_API_KEY;
const API_SECRET = process.env.REACT_APP_SPOTIFY_SECRET;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: 'white'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '100%'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '60%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '40ch',
      '&:focus': {
        width: '40ch'
      }
    }
  }
}));

function AudioRow(props) {
  const classes = useStyles();
  const [canvi, setCanvi] = useState([]);
  const [term, setTerm] = useState('');
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const searchRef = useRef('');
  useEffect(() => {
    if (term !== '') {
      axios
        .post(
          'https://accounts.spotify.com/api/token',
          querystring.stringify({
            grant_type: 'client_credentials'
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization:
                'Basic ' +
                new Buffer(`${API_KEY}:${API_SECRET}`).toString('base64')
            }
          }
        )
        .then((res) => {
          axios
            .get(
              `https://api.spotify.com/v1/search?q=${term}&type=track,artist,album,playlist`,
              {
                headers: {
                  Authorization: `Bearer ${res.data.access_token}`,
                  'Content-Type': 'application/json',
                  Accept: 'application/json'
                }
              }
            )
            .then((res) => {
              state.checkedB === false
                ? setCanvi(res.data.tracks.items)
                : setCanvi(res.data.playlists.items);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [term, state.checkedB]);

  return (
    <div style={{ marginTop: 25 }}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder='Search…'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputRef={searchRef}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              setTerm(searchRef.current.value);
            }
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
        PLAYLISTS:
        <Switch
          checked={state.checkedB}
          onChange={handleChange}
          color='primary'
          name='checkedB'
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <IconButton
          onClick={(event) => {
            setTerm(searchRef.current.value);
          }}
          color='primary'
        >
          <PageviewIcon style={{ fontSize: 45 }} />
        </IconButton>
      </div>
      {/* <UserAuth style={{ color: "white" }} /> */}
      <div className='row'>
        <div className='row_canvis'>
          {canvi.map((canvi) => (
            <Fragment>
              <div>
                <Button
                  color='primary'
                  onClick={() => {
                    state.checkedB === false
                      ? props.setContent(
                          `https://open.spotify.com/embed/track/${canvi.id}`
                        )
                      : props.setContent(
                          `https://open.spotify.com/embed/playlist/${canvi.id}`
                        );
                    props.submitUrl();
                  }}
                >
                  Select
                </Button>
              </div>
              <iframe
                src={
                  state.checkedB === false
                    ? `https://open.spotify.com/embed/track/${canvi.id}`
                    : `https://open.spotify.com/embed/playlist/${canvi.id}`
                }
                width='300'
                height='380'
                allowtransparency='true'
                allow='encrypted-media'
              ></iframe>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AudioRow;
