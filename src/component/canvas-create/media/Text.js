import React from 'react';

import ReactHtmlParser from 'react-html-parser';

function Text(props) {
  return <div>{ReactHtmlParser(props.content)} </div>;
}

export default Text;
