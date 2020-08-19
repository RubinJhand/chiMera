import React, { useState } from 'react';

import '../Row.scss';

import Button from '@material-ui/core/Button';
import { Editor } from '@tinymce/tinymce-react';

function TextRow(props) {
  const [text, setText] = useState('');

  const API_KEY = process.env.REACT_APP_CLOUD_EDIT_KEY;

  return (
    <>
      <Editor
        initialValue='Type something to add to your canvas...'
        apiKey={API_KEY}
        init={{
          height: 300,
          menubar: false,
          plugins: [],
          toolbar:
            ' fontselect | fontsizeselect | forecolor backcolor | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent '
        }}
        onEditorChange={(e) => setText(e)}
      />
      <Button
        color='primary'
        variant='contained'
        onClick={() => {
          props.setContent(text);
          props.submitUrl();
          console.log('HTML:', text);
        }}
      >
        Submit
      </Button>
    </>
  );
}

export default TextRow;
