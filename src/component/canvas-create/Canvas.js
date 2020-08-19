import React, { forwardRef, useState, useImperativeHandle } from 'react';

import Mediabox from './Mediabox';

import RGL, { WidthProvider } from 'react-grid-layout';

import '../../App.scss';
import './react_resizable_styles.scss';
import './react_grid_styles.scss';

import _ from 'lodash';

import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import CloseIcon from '@material-ui/icons/Close';

const ReactGridLayout = WidthProvider(RGL);

let saveMedia = {};

const Canvas = forwardRef((props, ref) => {
  const { media, mediaBox } = props;

  const [mediaInfo, setMediaInfo] = useState(media || []);

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
              isDraggable: true,
              isResizable: true,
              maxH: 1000,
              maxW: 1000,
              minH: 1,
              minW: 1
            };
          }),
          newCounter: props.counter
        }
      : {
          items: [0].map(function (i, key, list) {
            return {
              i: 'n' + i.toString(),
              x: i * 2,
              y: 0,
              w: 6,
              h: 10,
              isBounded: false,
              isDraggable: true,
              isResizable: true,
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
        <span className='text'>
          <DragIndicatorIcon style={{ color: 'white', cursor: 'pointer' }} />
        </span>
        <span
          className='remove'
          style={removeStyle}
          onClick={onRemoveItem.bind(this, i)}
        >
          <CloseIcon style={{ color: 'white', fontSize: '25' }} />
        </span>
      </div>
    );
  };

  const onAddItem = () => {
    setState({
      items: state.items.concat({
        i: 'n' + state.newCounter,
        x: state.newCounter,
        y: state.newCounter,
        w: 4,
        h: 6,
        isBounded: false,
        isDraggable: true,
        isResizable: true,
        maxH: 1000,
        maxW: 1000,
        minH: 1,
        minW: 1
      }),
      newCounter: state.newCounter + 1
    });
  };

  useImperativeHandle(ref, () => ({
    passCall() {
      onAddItem();
    }
  }));

  const onRemoveItem = (i) => {
    setState({ ...state, items: _.reject(state.items, { i: i }) });
    const newMediaInfo = mediaInfo.filter((x) => x.mediaBox_id !== i);
    setMediaInfo(newMediaInfo);
  };

  const onDrop = (layout, layoutItem, event) => {
    setState({
      items: state.items.concat({
        i: 'n' + state.newCounter,
        x: layoutItem.x,
        y: layoutItem.y,
        w: 4,
        h: 6,
        isBounded: false,
        isDraggable: true,
        isResizable: true,
        maxH: 1000,
        maxW: 1000,
        minH: 1,
        minW: 1
      }),
      newCounter: state.newCounter + 1
    });
  };
  console.log('PROPS.COUNTER:', props.counter);
  console.log('STATE.newCOUNTER:', state.newCounter);

  return (
    <>
      <div>
        <ReactGridLayout
          className='layout'
          cols={20}
          rowHeight={11}
          maxRows={31}
          minH={400}
          isDroppable={true}
          onDrop={onDrop}
          preventCollision={true}
          verticalCompact={false}
          onResizeStop={(layout) => {
            setState({ ...state, items: layout });
          }}
          onDragStop={(layout) => {
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
export default Canvas;
