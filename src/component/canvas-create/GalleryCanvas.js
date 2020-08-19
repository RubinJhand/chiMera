import React, { forwardRef, useState } from 'react';

import _ from 'lodash';
import Mediabox from './Mediabox';
import RGL, { WidthProvider } from 'react-grid-layout';

import '../../App.scss';
import './react_resizable_styles.scss';
import './react_grid_styles.scss';

const ReactGridLayout = WidthProvider(RGL);

let saveMedia = {};

const GalleryCanvas = forwardRef((props, ref) => {
  const { media, mediaBox } = props;

  const [mediaInfo, setMediaInfo] = useState(props.media || []);

  const [state, setState] = useState(
    mediaBox
      ? {
          items: mediaBox.map(function (i, key, list) {
            return {
              i: i.i,
              x: i.x,
              y: i.y,
              w: i.w,
              h: i.h,
              isBounded: false,
              isDraggable: false,
              isResizable: false,
              maxH: 1000,
              maxW: 1000
            };
          }),
          newCounter: mediaBox.newCounter
        }
      : {
          items: [0].map(function (i, key, list) {
            return {
              i: 'n' + i.toString(),
              x: i * 2,
              y: 0,
              w: 8,
              h: 8,
              isBounded: false,
              isDraggable: false,
              isResizable: false,
              maxH: 1000,
              maxW: 1000,
              minH: 1,
              minW: 1
            };
          }),
          newCounter: 1
        }
  );

  saveMedia = [state, mediaInfo];

  const createMediaObject = (id, mediaUrl, mediaType) => {
    const newMediaObject = {
      mediaBox_id: id,
      mediaUrl: mediaUrl,
      mediaType: mediaType
    };
    setMediaInfo([...mediaInfo, newMediaObject]);
  };

  const createElement = (el) => {
    const removeStyle = {
      position: 'absolute',
      right: '2px',
      top: 0,
      cursor: 'pointer'
    };
    const i = el.i;

    return (
      <div key={i} data-grid={el}>
        <Mediabox
          mediaObject={mediaInfo.find((x) => x.mediaBox_id === i)}
          createObject={createMediaObject}
          boxID={i}
        />
      </div>
    );
  };

  return (
    <>
      <div>
        <ReactGridLayout
          className='layout'
          cols={20}
          rowHeight={10}
          maxRows={31}
          preventCollision={true}
          verticalCompact={false}
          onResize={(layout) => {
            setState({ ...state, items: layout });
          }}
        >
          {_.map(state.items, (el) => createElement(el))}
        </ReactGridLayout>
      </div>
    </>
  );
});

export { saveMedia };
export default GalleryCanvas;
