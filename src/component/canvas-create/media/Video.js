import React from "react";
import ReactPlayer from "react-player";

function Video(props) {
  return (
    <ReactPlayer
      width="100%"
      height="100%"
      url={props.content}
      controls
      muted
      config={{
        youtube: {
          playerVars: { showinfo: 1 },
        },
      }}
    />
  );
}

export default Video;
