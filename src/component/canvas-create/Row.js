import React from 'react';

import Panels from '../Panels';

import './Row.scss';

function Row(props) {
  const panels = props.panels;

  return (
    <div className='row'>
      <div className='row_canvis'>
        {panels.map(({ id, panel }) => (
          <div className='row_div'>
            <Panels
              key={id}
              panel_id={id}
              username={panel.username}
              title={panel.title}
              description={panel.description}
              music_id={panel.music_id}
              media={panel.media}
              mediaBox={panel.mediaBox}
              mediaCounter={panel.mediaCounter}
              time={panel.timestamp}
              openModal={props.openModal}
              createGallery={props.createGallery}
              setMode={props.setMode}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
