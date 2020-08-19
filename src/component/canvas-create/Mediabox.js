import React, { useState, useEffect } from 'react';

import Mediaform from './Mediaform';

import Image from './media/Image';
import Video from './media/Video';
import Audio from './media/Audio';
import Text from './media/Text';

import '../../App.scss';

function Mediabox(props) {
  const [error, setError] = useState('');
  const [trigger, setTrigger] = useState(null);
  const [content, setContent] = useState(
    props.mediaObject ? props.mediaObject.mediaUrl : ''
  );
  const [mode, setMode] = useState(
    props.mediaObject ? props.mediaObject.mediaType : 'EDIT'
  );

  const onSave = () => {};

  useEffect(() => {
    if (trigger !== null) {
      props.createObject(props.boxID, content, mode);
    }
  }, [trigger]);

  return (
    <React.Fragment>
      {mode === 'EDIT' && (
        <Mediaform
          setMode={setMode}
          setContent={setContent}
          fireTrigger={setTrigger}
        />
      )}
      {mode === 'IMAGE' && <Image content={content} />}
      {mode === 'VIDEO' && <Video content={content} />}
      {mode === 'AUDIO' && <Audio content={content} />}
      {mode === 'TEXT' && <Text content={content} />}
    </React.Fragment>
  );
}

export default Mediabox;
