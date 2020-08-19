import React, { useState, useEffect, useRef } from 'react';

import axios from '../axios';

import '../Row.scss';

import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import PageviewIcon from '@material-ui/icons/Pageview';

const API_KEY = process.env.REACT_APP_AZURE_API_KEY;

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
      width: 'auto'
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
    width: '65%'
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

function ImageRow(props) {
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
      if (state.checkedB) {
        async function fetchData() {
          const request = await axios.get(
            'https://api.cognitive.microsoft.com/bing/v7.0/images/search',
            {
              headers: {
                'Ocp-Apim-Subscription-Key': API_KEY
              },
              params: {
                count: 30,
                mkt: 'en-US',
                q: term,
                imageType: 'AnimatedGif'
              }
            }
          );
          setCanvi(request.data.value);
          return request;
        }
        fetchData();
      } else {
        async function fetchData() {
          const request = await axios.get(
            'https://api.cognitive.microsoft.com/bing/v7.0/images/search',
            {
              headers: {
                'Ocp-Apim-Subscription-Key': API_KEY
              },
              params: {
                count: 30,
                mkt: 'en-US',
                q: term
              }
            }
          );
          setCanvi(request.data.value);
          return request;
        }
        fetchData();
      }
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
        GIF:
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
            <img
              key={canvi.imageId}
              className='row_canvi'
              src={canvi.contentUrl}
              style={{ cursor: 'pointer' }}
              onError={(i) => (i.target.style.display = 'none')}
              alt={canvi.name}
              onClick={() => {
                props.setContent(canvi.contentUrl);
                props.submitUrl();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageRow;
