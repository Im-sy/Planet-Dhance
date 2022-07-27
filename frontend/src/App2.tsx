import React, { SetStateAction, useState } from 'react'
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { IconButton, Checkbox } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import myVideo from './videos/IMG_0960.mp4';
import './App.css';

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
		console.log("muted", muted)
    setPlayState({ ...playState, muted: !muted });
  };

  const handlePlay = () => {
    console.log('onPlay');
    const inState = {
      ...playState,
    };
    inState.playing = !inState.playing;
    console.log(inState);

    setPlayState(inState);
  };

	const handlePause = () => {
    console.log("onPause");
		setPlayState({ ...playState, playing: false });
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayState({ ...playState, played: parseFloat(e.target.value) });
  };

	const handleProgress = (state: ReactPlayerProps) => {
		const inState = {
			...playState, ...state
		}
    console.log("onProgress", inState);
		setPlayState(inState as SetStateAction<playProps>);
  };

  return (
    <div>
      <h1>ReactPlayer Demo</h1>
			<div>
				<ReactPlayer className="react-player"
					width="98vw" height="98vh"
					url={myVideo}
					playing={playing}
					loop
					muted={muted}
					onPlay={handlePlay}
					onPause={handlePause}
					onProgress={handleProgress} />
			</div>
			<div>
				<button onClick={handlePlayPause}>
					{playing ? "pause" : "play"}
				</button>
				<IconButton onClick={handlePlayPause}
					aria-label={playing ? "pause" : "play"}>
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
				<Checkbox checked={muted}
					onChange={handleToggleMuted}
					icon={<VolumeUpIcon />}
					checkedIcon={<VolumeOffIcon />} />
				<IconButton onClick={handleToggleMuted}
					aria-label={muted ? "off" : "on"}>
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
