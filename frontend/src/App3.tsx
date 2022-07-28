
import React, { CSSProperties, SetStateAction, useState } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import { IconButton, Checkbox } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import myVideo from './videos/IMG_0960.mp4';
import './App.css';


// webcam 부분 1----------------------------------

import {
  RecordWebcam,
  useRecordWebcam,
  CAMERA_STATUS
} from "react-record-webcam";
import type {
  WebcamRenderProps,
  RecordWebcamOptions,
  RecordWebcamHook
} from "react-record-webcam";
import "./styles.css";

const OPTIONS: RecordWebcamOptions = {
  filename: "test-filename",
  fileType: "mp4",
  // width: 1960,
  // height: 1080,
  width: 350,
  height: 700,
  aspectRatio : 0.666
};

const webcamStyle: CSSProperties = {
  position: 'absolute',
  top: '80px',
  left : '220px',
  width: '140px',
  height: '190px',
  backgroundColor: 'gray'
};


//---------------------------------------------------------
// 버튼들 css
const challengeStartStyle: CSSProperties = {
  position: 'absolute',
  top: '600px',
  left: '130px',
  width: '90px',
  height: '40px',
  backgroundColor: 'rgba( 0, 0, 255, 0.2 )',
  border : '0'
};

const challengeEndStyle: CSSProperties = {
  position: 'absolute',
  top: '600px',
  left: '220px',
  width: '90px',
  height: '40px',
  backgroundColor: 'rgba( 0, 0, 255, 0.2 )',
  border : '0'
};

const backStyle: CSSProperties = {
  position: 'absolute',
  top: '100px',
  left: '10px',
  width: '90px',
  height: '40px',
  backgroundColor: 'rgba( 255, 255, 255, 1 )',
  border : '0'
};
const saveStyle: CSSProperties = {
  position: 'absolute',
  top: '600px',
  left: '310px',
  width: '90px',
  height: '40px',
  backgroundColor: 'rgba( 255, 255, 255, 1 )',
  border : '0'
};



//---------------------------------------------------
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

export default function App3() {
  // webcam 부분 2-------------------------------------------
  const recordWebcam: RecordWebcamHook = useRecordWebcam(OPTIONS);

  const getRecordingFileHooks = async () => {
    const blob = await recordWebcam.getRecording();
    console.log({ blob });
  };

  //-----------------------------------------------------------


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
    // if (playing) {recordWebcam.stop()}
    // else{recordWebcam.start()}

  };

  const handleToggleMuted = () => {
    console.log('muted', muted);
    setPlayState({ ...playState, muted: !muted });
  };

  const handlePlay = () => {
    console.log('onPlay');
    setPlayState({ ...playState, playing: true });
    recordWebcam.open();
    console.log('카메라 켜기')
    // recordWebcam.start();
    // console.log('영상촬영시작')
  };

  const handlePause = () => {
    console.log('onPause');
    setPlayState({ ...playState, playing: false });
    // recordWebcam.stop();
    // console.log('영상촬영종료')
    // recordWebcam.download();
    // console.log('영상저장중')
    // recordWebcam.retake();
    // console.log('다시촬영')
    // recordWebcam.close();
    // console.log('카메라 끄기')

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
    <div >

  
     




      <h1>ReactPlayer Demo</h1>
      <progress max={1} value={played} />
      <div style={videoZone}>

        <video
            ref={recordWebcam.webcamRef}
            style={webcamStyle}
            autoPlay
            muted
          />


        <ReactPlayer
          className="react-player"
          width="360px"
          height="800px"
          url={myVideo}
          playing={playing}
          loop
          muted={muted}
          onPlay={handlePlay}
          onPause={handlePause}
          onProgress={handleProgress}
        />
        <progress
          style={progressStyle}
          className="progressbar"
          max={1}
          value={played}
        />

        {/* 영상녹화시작 */}
        <button  onClick={recordWebcam.start} 
                  style={challengeStartStyle}
                  disabled={
                    recordWebcam.status === CAMERA_STATUS.CLOSED ||
                    recordWebcam.status === CAMERA_STATUS.RECORDING ||
                    recordWebcam.status === CAMERA_STATUS.PREVIEW
                  }>
            챌린지 시작
        </button>

        {/* 영상녹화중단 -> 추후에 자동 중단으로 바꾸기*/}
        <button  onClick={recordWebcam.stop} 
                  style={challengeEndStyle}
                  disabled={recordWebcam.status !== CAMERA_STATUS.RECORDING}>
            챌린지 종료
        </button>


        {/* 뒤로가기 -> 챌린지 중에 작동할 기능*/}
        <button  onClick={recordWebcam.stop} 
                  style={backStyle}
                 >
            뒤로가기
        </button>


        {/* 영상저장 -> 챌린지 후에 저장화면 */}
        <button
            disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
            onClick={recordWebcam.download}
            style={saveStyle}
          >
            Download
          </button>

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
