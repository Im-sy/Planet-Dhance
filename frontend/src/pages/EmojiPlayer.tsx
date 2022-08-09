import React, { CSSProperties, SetStateAction, useState } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import { IconButton, Checkbox } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import { ProgressBar } from '../components/UI/ProgressBar';

import myVideo from '../videos/IMG_0960.mp4';
import sample1 from '../videos/sample1.mp4';
import sample2 from '../videos/sample2.mp4';
import '../styles/App.css';
import Emoji from '../components/Emoji';

const progressStyle: CSSProperties = {
  position: 'absolute',
  top: '10px',
  width: '360px',
  height: '10px',
  backgroundColor: 'gray',
};

const videoZone: CSSProperties = {
  position: 'relative',
};
interface playProps {
  url: string;
  playing: boolean;
  muted: boolean;
  played: number;
  loaded: number;
}

export default function App2() {
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
    <div className='App2'>
      {played>=0.3 ? <Emoji emoji='💘'/> : ''}
      {played>=0.6 ? <Emoji emoji='😍'/> : ''}
      {played>=0.9 ? <Emoji emoji='🎉'/> : ''}
      {played===1 ? <Emoji emoji='💯'/> : ''}
      {/* <h1>ReactPlayer Demo</h1>
      <progress max={1} value={played} /> */}
      <div style={videoZone}>
        <ReactPlayer
          className="react-player"
          width="360px"
          height="800px"
          url={sample1}
          playing={playing}
          // loop
          muted={muted}
          onPlay={handlePlay}
          onPause={handlePause}
          onProgress={handleProgress}
          onEnded={() => {console.log('ended')}}
        />
        <ProgressBar
          played={played}
        />
      </div>
      <div>
        <button onClick={handlePlayPause}>{playing ? 'pause' : 'play'}</button>
        <IconButton
          onClick={handlePlayPause}
          aria-label={playing ? 'pause' : 'play'}
        >
          {playing ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
      </div>
      <div>
        <label htmlFor="muted">Muted</label>
        <input
          id="muted"
          type="checkbox"
          checked={muted}
          onChange={handleToggleMuted}
        />
        <Checkbox
          checked={muted}
          onChange={handleToggleMuted}
          icon={<VolumeUpIcon />}
          checkedIcon={<VolumeOffIcon />}
        />
        <IconButton
          onClick={handleToggleMuted}
          aria-label={muted ? 'off' : 'on'}
        >
          {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </IconButton>
      </div>
      <div>
        <input
          type="range"
          min={0}
          max={0.999999}
          step="any"
          value={played}
          onChange={handleSeekChange}
        />
      </div>
      <div>
        <progress max={1} value={played} />
      </div>
    </div>
  );
}
