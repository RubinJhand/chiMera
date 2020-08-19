import React from 'react';

import Title from './Title';
import UserAuth from '../auth/authUser';

import '../App.scss';

import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Popper,
  MenuItem,
  ClickAwayListener,
  Grow,
  Paper,
  MenuList
} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // color: "white",
    color: 'black'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
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
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));

function Navbar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const menuSelect = (clicked) => {
    props.setMode(clicked);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed' color='transparent' elevation={0}>
        <Toolbar style={{ marginLeft: 20 }}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup='true'
            onClick={handleToggle}
          >
            <MenuIcon />
          </IconButton>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom'
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id='menu-list-grow'
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem
                        onClick={(event) => {
                          handleClose(event);
                          menuSelect('MYCANVASES');
                        }}
                      >
                        My Canvases
                      </MenuItem>
                      <MenuItem
                        onClick={(event) => {
                          handleClose(event);
                          props.setMedia([]);
                          props.setMediaBox();
                          menuSelect('NEWCANVAS');
                        }}
                      >
                        New Canvas
                      </MenuItem>
                      <MenuItem
                        onClick={(event) => {
                          handleClose(event);
                          menuSelect('EXPLORECANVASES');
                        }}
                      >
                        Explore
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
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
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <UserAuth userName={props.userName} menuSelect={menuSelect} />
          {/* <UserAuth style={{ color: "white" }} /> */}
          <div
            style={{ marginLeft: 'auto', marginRight: 40, marginTop: 26 }}
          ></div>
          <Title text={'chiMera'} menuSelect={menuSelect} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
