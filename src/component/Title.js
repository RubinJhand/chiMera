import React, { useRef, useState } from 'react';
import '../App.scss';

function Title(props) {
  const [state, setState] = useState(0);
  const titleContainer = useRef(null);

  const _onMouseMove = (e) => {
    const width = titleContainer.current.clientWidth;
    const height = titleContainer.current.clientHeight;
    const oX = (e.nativeEvent.offsetX / width) * 100;
    const oY = (e.nativeEvent.offsetY / height) * 100;
    setState({
      x: oX,
      y: oY
    });
  };

  const { x, y } = state;
  const maskStyle = {
    '--maskX': x,
    '--maskY': y
  };

  return (
    <div
      onClick={() => props.menuSelect('HOME')}
      className='titleContainer'
      onMouseMove={_onMouseMove}
      // onMouseOut={_onMouseOut}
      ref={titleContainer}
      style={maskStyle}
    >
      <div className='titleWrapper' onClick={() => props.menuSelect('HOME')}>
        <h1> {props.text} </h1>
      </div>
      <div
        className='titleWrapper cloneWrapper'
        onClick={() => props.menuSelect('HOME')}
      >
        <h1> {props.text} </h1>
      </div>
    </div>
  );
}

export default Title;
