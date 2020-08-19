import React, { useState, useEffect } from 'react';

import { db } from './config/firebase';

//Component files
import Navbar from './component/Navbar';
import Toolbar from './component/canvas-create/Toolbar';
import GalleryCanvas from './component/canvas-create/GalleryCanvas';
import Row from './component/canvas-create/Row';
import PresentCanvas from './component/canvas-create/PresentCanvas';
import requests from './component/canvas-create/requests';
import Workarea from './component/canvas-create/Workarea';
import Landcard from './component/canvas-create/Landcard';

import './App.scss';
import './component/Panels.scss';
import './component/canvas-create/Workspace.scss';
import 'rc-footer/assets/index.css';

import Headroom from 'react-headroom';
import ReactLoading from 'react-loading';
import Footer from 'rc-footer';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

function App() {
  const [mode, setMode] = useState('HOME');
  const [panels, setPanels] = useState([]);
  const [media, setMedia] = useState([]);
  const [title, setTitle] = useState('');
  const [mediaBox, setMediaBox] = useState();
  const [panelID, setPanelID] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [counter, setCounter] = useState();

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const unsubscribe = db
      .collection('panels')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setPanels(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            panel: doc.data()
          }))
        );
      });
    return () => {
      unsubscribe();
    };
  }, []);

  const theme = createMuiTheme({
    typography: {
      fontFamily: 'Raleway'
    },
    overrides: {
      MuiButton: {}
    }
  });

  const createModal = (media, mediaBox, title) => {
    setMedia(media);
    setMediaBox(mediaBox);
    setTitle(title);
    setOpenModal(true);
  };

  const createGallery = (media, mediaBox, title, user, panelID, newCounter) => {
    setMedia(media);
    setPanelID(panelID);
    setMediaBox(mediaBox);
    setTitle(title);
    setCounter(newCounter);
    setUserName(user);
  };

  return (
    <div className='App'>
      <MuiThemeProvider theme={theme}>
        <Headroom>
          <div className='header'>
            <Navbar
              setMode={setMode}
              userName={userName}
              setMedia={setMedia}
              setMediaBox={setMediaBox}
            />
          </div>
        </Headroom>
        {mode === 'NEWCANVAS' && (
          <div>
            <Workarea
              createGallery={createGallery}
              setMode={setMode}
              media={media}
              mediaBox={mediaBox}
              mode={mode}
            />
          </div>
        )}
        {mode === 'EDITCANVAS' && (
          <div>
            <Workarea
              createGallery={createGallery}
              setMode={setMode}
              media={media}
              mediaBox={mediaBox}
              panel_id={panelID}
              counter={counter}
              mode={mode}
            />
          </div>
        )}
        {mode === 'MYCANVASES' && (
          <div>
            <div className='title-header'>My Canvases</div>
            <Row
              title='Suggested Canvi'
              fetchUrl={requests.fetchTrending}
              panels={panels}
              openModal={createModal}
              setMode={setMode}
              createGallery={createGallery}
            />
          </div>
        )}
        {mode === 'EXPLORECANVASES' && (
          <div>
            <div className='title-header'>Browse Canvases</div>
            <Row
              title='Suggested Canvi'
              fetchUrl={requests.fetchTrending}
              panels={panels}
              openModal={createModal}
              setMode={setMode}
              createGallery={createGallery}
            />
          </div>
        )}
        {mode === 'CREATEDCANVAS' && (
          <>
            <Toolbar
              canvasName={title}
              setMode={setMode}
              setEdit={setEdit}
              userName={userName}
              panel_id={panelID}
              mode={mode}
            />
            <div className='workspace'>
              <GalleryCanvas media={media} mediaBox={mediaBox} />
            </div>
            <Row
              title='Suggested Canvi'
              fetchUrl={requests.fetchTrending}
              panels={panels}
              openModal={createModal}
              setMode={setMode}
              createGallery={createGallery}
            />
          </>
        )}
        {mode === 'HOME' && (
          <>
            <div>
              <Landcard
                getStarted={() => setMode('NEWCANVAS')}
                setMedia={setMedia}
                setMediaBox={setMediaBox}
              />
            </div>
            <Row
              title='Suggested Canvi'
              fetchUrl={requests.fetchTrending}
              panels={panels}
              openModal={createModal}
              setMode={setMode}
              createGallery={createGallery}
            />
          </>
        )}
        {mode === 'LOADINGCANVAS' && (
          <>
            <Toolbar canvasName={title} setMode={setMode} panelID={panelID} />
            <div className='workspace' style={{ textAlign: 'center' }}>
              <div style={{ display: 'inline-block', marginTop: 200 }}>
                <ReactLoading
                  type={'balls'}
                  color={'#5B84B1FF'}
                  height={200}
                  width={200}
                />
              </div>
            </div>
            <Row
              title='Suggested Canvi'
              fetchUrl={requests.fetchTrending}
              panels={panels}
              openModal={createModal}
              setMode={setMode}
              createGallery={createGallery}
            />
          </>
        )}
        <PresentCanvas
          media={media}
          mediaBox={mediaBox}
          openModal={openModal}
          closeModal={setOpenModal}
        />
        <div style={{ height: 100 }}></div>
        <Footer
          style={{ fontFamily: 'Varela Round' }}
          backgroundColor='transparent'
          columns={[
            {
              icon: (
                <IconButton style={{ color: 'white' }}>
                  <GitHubIcon />
                </IconButton>
              ),
              url: 'https://github.com/RubinJhand/chiMera',
              openExternal: true
            }
          ]}
          bottom={`Made by Rubin Jhand & Christopher Smith`}
        />
        ,
      </MuiThemeProvider>
    </div>
  );
}

export default App;
