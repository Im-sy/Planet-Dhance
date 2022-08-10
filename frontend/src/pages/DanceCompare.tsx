import React, { CSSProperties, SetStateAction, useState } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import '../styles/tailwind_reset.css';
import sample1 from '../videos/sample1.mp4';
import sample2 from '../videos/sample2.mp4';

import { ProgressBar } from '../components/UI/ProgressBar';


const videoZone: CSSProperties = {
  position: 'relative',
};

const subCamStyle: CSSProperties = {
  position: 'absolute',
  zIndex : '1',
  // left:"12.2rem",
  left: "65vw",
  top:"0.5rem",
};

const mainCamStyle: CSSProperties = {
  position: 'absolute',
  backgroundColor: 'black',
  width: '100vw',
  height: '100vh',
  backgroundSize: "cover",
};

interface playProps {
  url: string;
  playing: boolean;
  muted: boolean;
  played: number;
  loaded: number;
}


export function DanceCompare(){
  const [playState, setPlayState] = useState<playProps>({
    url: '',
    playing: true,
    muted: true,
    played: 0,
    loaded: 0,
  });

  const { url, playing, muted, played, loaded } = playState;

  const handlePlayPause = () => {
    setPlayState({ ...playState, playing: !playing });
  };

  const handleToggleMuted = () => {
    console.log('muted', muted);
    setPlayState({ ...playState, muted: !muted });
  };

  const handlePlay = () => {
    console.log('onPlay');
    setPlayState({ ...playState, playing: true });
  };

  const handlePause = () => {
    console.log('onPause');
    setPlayState({ ...playState, playing: false });
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayState({ ...playState, played: parseFloat(e.target.value) });
  };

  const handleProgress = (state: ReactPlayerProps) => {
    const inState = {
      ...playState,
      ...state,
    };
    console.log('onProgress', inState);
    setPlayState(inState as SetStateAction<playProps>);
  };
  return (
    <div style={videoZone}>
      <ProgressBar played={played}/>
      <ReactPlayer
          className="react-player big-player"
          style={mainCamStyle}
          width="100vw"
          height="800px"
          url={sample1}
          playing={playing}
          // loop
          muted={muted}
          // onPlay={handlePlay}
          // onPause={handlePause}
          // onProgress={handleProgress}
          onEnded={() => {console.log('ended')}}
        />
      {/* 우상단 작은 리엑트 플레이어 재생 */}
      <ReactPlayer
          className="small-player"
          style={
            subCamStyle
          }
          width="130px"
          height="330px"
          url={sample2}
          playing={playing}
          // loop
          muted={muted}
          onPlay={handlePlay}
          onPause={handlePause}
          onProgress={handleProgress}
          onEnded={() => {console.log('ended2')}}
        />
    </div>
  )
}