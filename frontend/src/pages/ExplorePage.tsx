import React, {
  CSSProperties,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import axios from 'axios';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import myVideo from '../videos/IMG_0960.mp4';
import '../styles/tailwind_reset.css'

const Text = styled.button`
  background: palevioletred;
  border-radius: 3px;
  border: none;
  color: white;
`;

const playerStyle: CSSProperties = {
  position: 'absolute',
  width: '98vw',
  height: '95vh',
  transform: 'scaleX(-1)',
  backgroundColor: 'black',
  // backgroundColor: 'green',
};

const progressStyle: CSSProperties = {
  position: 'absolute',
  top: '5vh',
  width: '98vw',
  height: '10px',
  backgroundColor: 'gray',
  zIndex: '100'
};

const videoZone: CSSProperties = {
  position: 'relative',
};


interface playProps {
  url: string;
  playing: boolean;
  played: number;
  muted: boolean;
}



export default function PlayingPage( props : playProps ){


  const [playState, setPlayState] = useState<playProps>({
    url: '',
    playing: true,
    muted: true,
    played: 0,
  });
  const {played} = playState;
  const { url, playing,muted } = props;
  useEffect(() =>{
    // axios here
  },[])

  const handlePlay = () => {
    console.log('handlePlay');
    setPlayState({ ...playState, playing: true });
  }
  const handlePause = () => {
    console.log('onPause');
    setPlayState({ ...playState, playing: false });
  }; 
  const handleProgress = (state: ReactPlayerProps) => {
    const inState = {
      ...playState,
      ...state,
    };
    // console.log('onProgress', inState);
    setPlayState(inState as SetStateAction<playProps>);
  };

  const playEnd = () =>{

  }

  return (
    <div style={videoZone}>
      <progress
          style={progressStyle}
          className="progressbar"
          max={1}
          value={played}
        />
    <ReactPlayer
          className="react-player"
          width="98vw"
          height="94vh"
          loop
          style={playerStyle}
          url={myVideo}
          playing={playing}
          muted={muted}
          onPlay={handlePlay}
          onPause={handlePause}
          onProgress={handleProgress}
          onEnded={playEnd}
        />

      </div>
  )
}