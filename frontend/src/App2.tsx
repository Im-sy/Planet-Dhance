import React, { SetStateAction, useState } from 'react'
import ReactPlayer, { ReactPlayerProps } from "react-player";

import myVideo from './videos/IMG_0960.mp4';

interface playProps {
	url: string,
	playing: boolean,
	muted: boolean,
	played: number,
	loaded: number,
}

export default function App2() {

	const [playState, setPlayState] = useState<playProps>({
		url: '',
		playing: true,
		muted: true,
		played: 0,
		loaded: 0
	})

	const {url, playing, muted, played, loaded} = playState;

	const handlePlayPause = () => {
    setPlayState({ ...playState, playing: !playing });
  };

	const handleToggleMuted = () => {
    setPlayState({ ...playState, muted: !muted });
  };

	const handlePlay = () => {
    console.log("onPlay");
    setPlayState({ ...playState, playing: true });
  };

	const handlePause = () => {
    console.log("onPause");
    setPlayState({ ...playState, playing: false });
  };

	const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayState({ ...playState, played: parseFloat(e.target.value) });
  };

	const handleProgress = (state: ReactPlayerProps) => {
    console.log("onProgress", state);
    setPlayState(state as SetStateAction<playProps>);
  };


  return (
    <div>
      <h1>ReactPlayer Demo</h1>
			<div>
				<ReactPlayer className="react-player"
					width="98vw" height="98vh"
					url={myVideo}
					playing
					loop
					muted={muted}
					onPlay={handlePlay}
					onPause={handlePause}
					onProgress={handleProgress} />
			</div>
			<div>
				<label htmlFor="muted">Muted</label>
				<input
					id="muted"
					type="checkbox"
					checked={muted}
					onChange={handleToggleMuted}
				/>
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
  )
}
