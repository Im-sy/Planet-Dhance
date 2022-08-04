import React from 'react';
import ReactPlayer from 'react-player/lazy';
import './App.css';
// <iframe width="329" height="584" src="https://www.youtube.com/embed/h-f7OpOvcY4" title="청하 x 츄 - Sparkling 챌린지 #Sparkling" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
import VideoPlayer from './VideoPlayer';

import myVideo from './videos/IMG_0960.mp4';

function App() {
  return (
    <div className="App">
      {/* <VideoPlayer title="청하 x 츄 - Sparkling 챌린지 #Sparkling" vodPlaylistId='h-f7OpOvcY4' /> */}
      <ReactPlayer 
        className="react-player"
        url={myVideo}
        width="98vw"
        height="98vh"
        playing
        muted
        controls
        loop
        pip/>
    </div>
  );
}

export default App;
