
import React, { CSSProperties, SetStateAction, useState, useEffect, useRef } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import { IconButton, Checkbox } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

// import myVideo from './videos/IMG_0960.mp4';
import myVideo from './videos/fullvideo.mp4';
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
  // ReactPlayer의 width, height와 일치시켜야하는듯?
  width: 360,
  height: 800,
  aspectRatio : 1
};



//-------------------------------------------------
// main <-> sub 바꾸는 부분
const subcamStyle: CSSProperties = {
  position: 'absolute',
  zIndex : '1',
  // top: '10vw',
  left : '65vw',
  width: '35vw',
  height: '50vh',
};



const maincamStyle: CSSProperties = {
  position: 'absolute',
  width: '100vw',
  height: '100vh',
  // backgroundColor: 'black',
  backgroundColor: 'green'
  
};

const subplayerStyle: CSSProperties = {
  position: 'absolute',
  zIndex : '1',
  left : '65vw',
  width: '35vw',
  height: '50vh',
};



const mainplayerStyle: CSSProperties = {
  position: 'absolute',
  // left : '360px',
  // backgroundColor: 'black',
  backgroundColor: 'green'

  
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

const retakeStyle: CSSProperties = {
  position: 'absolute',
  top: '600px',
  left: '400px',
  width: '90px',
  height: '40px',
  backgroundColor: 'rgba( 255, 255, 255, 1 )',
  border : '0'
};

const timerStyle: CSSProperties = {
  position: 'absolute',
  top: '400px',
  left: '200px',
  width: '90px',
  height: '40px',
  // backgroundColor: 'rgba( 255, 255, 255, 1 )',
  // border : '0'
};



const mode1Style: CSSProperties = {
  position: 'absolute',
  // top: '10px',
  // left: '10px',
  // width: '20px',
  // height: '10px',
  top: '20vh',
  left: '5vw',
  width: '20vw',
  height: '10vh',
  backgroundColor: 'rgba( 0, 0, 255, 0.5 )',
  border : '0'
};

const mode2Style: CSSProperties = {
  position: 'absolute',
  // top: '10px',
  // left: '10px',
  // width: '20px',
  // height: '10px',
  top: '30vh',
  left: '5vw',
  width: '20vw',
  height: '10vh',
  backgroundColor: 'rgba( 0, 0, 255, 0.5 )',
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

export default function ModeChallengeTimer() {
  
  //--------------------------------------------------
  // 모드 변경 부분
  // 있어야 하는 데이터
  // ReactPalyer : width "35vw"/"100vh", height "50vw"/"100vh", style subplayerStyle/mainplayerStyle
  // video : maincamStyle/subcamStyle

  let [reactPlayer, reactPlayerChange] = useState(['main','100vw','100vh']);
  // let [reactPlayer, reactPlayerChange] = useState([' ',' ',' ']);
  let [reactPlayerBackground, reactPlayerBackgroundChange] = useState(mainplayerStyle);
  
  let [reactCamStyle, reactCamStyleChange] = useState(subcamStyle);
  
  // setInterval(()=>{console.log(reactPlayer)},10000)

  // 안무영상이 main / 내 영상이 sub
  function mode1(){
    console.log('버튼이 클릭됨')
    if (reactPlayer[0]==='sub'){
      // 안무영상 부분
      let newData = [...reactPlayer]
      newData[0]='main'
      newData[1]='100vw'
      newData[2]='100vh'
      reactPlayerChange(newData);
      reactPlayerBackgroundChange(mainplayerStyle);
      
      // 내 영상 부분
      reactCamStyleChange(subcamStyle);
    }

  }


  // 안무 영상이 sub / 내 영상이 main
  function mode2(){
    if (reactPlayer[0]==='main'){
      // 안무영상 부분
      let newData = [...reactPlayer]
      newData[0]='sub'
      newData[1]='35vw'
      newData[2]='50vh'
      reactPlayerChange(newData);
      reactPlayerBackgroundChange(subplayerStyle);

      // 내 영상 부분
      reactCamStyleChange(maincamStyle);
    }

  }



  // webcam 부분 2-------------------------------------------
  const recordWebcam: RecordWebcamHook = useRecordWebcam(OPTIONS);

  const getRecordingFileHooks = async () => {
    const blob = await recordWebcam.getRecording();
    console.log({ blob });
  };

  //-----------------------------------------------------------
  // timer 부분
      // We need ref in this, because we are dealing
    // with JS setInterval to keep track of it and
    // stop it when needed
    const Ref = useRef(null);
  
    // The state for our timer
    const [timer, setTimer] = useState(' ');

  
    const getTimeRemaining = (e:any) => {
        const total = Date.parse(e) - Date.parse(new Date().toString());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
  
  
    const startTimer = (e:any) => {
        let { total, hours, minutes, seconds } 
                    = getTimeRemaining(e);
        // if (total >= 0) {
        if (seconds >= 0) {
  
            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            // setTimer(
           console.log(seconds)
            setTimer(
                (hours > -1 ? ' ' : ' ') + 
                (minutes > -1 ? ' ': ' ' )+ 
                (seconds > -1 ? seconds : ' ')
            )
            // seconds===-1 로 안하면, 계속 실행됨
        }else if(seconds===-1){
          console.log(total, seconds)
          
          // 0초가 되면 타이머 사라짐
          setTimer(
            (hours > -1 ? ' ' : ' ') + 
            (minutes > -1 ? ' ': ' ' )+ 
            (seconds > -1 ? ' ' : ' ') )


            if (!(recordWebcam.status === CAMERA_STATUS.CLOSED ||
              recordWebcam.status === CAMERA_STATUS.RECORDING ||
              recordWebcam.status === CAMERA_STATUS.PREVIEW))
            {console.log('time to start recording')
            setPlayState({ ...playState, played: 0})
            recordWebcam.start()}


          
          
        }
    }
  
  
    const clearTimer = (e:any) => {
  
   
        // 처음 시간 설정해 주는 부분
        setTimer('3');
  
        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
          // console.log("남은시간",timer)
          // console.log(Ref.current)
                startTimer(e);
              
       
        }, 1000)
        Ref.current = id;


    }
  
    const getDeadTime = () => {
        let deadline = new Date();
  
        // This is where you need to adjust if 
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 3);
        return deadline;
    }
  
    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible
  
    // We put empty array to act as componentDid
    // mount only
    // useEffect(() => {
    //     clearTimer(getDeadTime());
    // }, []);
  
    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button
    const onClickReset = () => {
        clearTimer(getDeadTime());
    }


  //----------------------------------------------------------------------------




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


  const challengeEnd = () => {
    console.log('안무티칭영상이 끝났습니다.')
    recordWebcam.stop();
    console.log('웹캠 녹화가 종료되었습니다.')
    // recordWebcam.stop() 이 완료된 후에 아래의 recordWebcam.download 함수가 실행되어야 함
    setTimeout(recordWebcam.download,1000);
    // recordWebcam.download();
    document.getElementById('webcam').style.visibility = "hidden";
  }

  return (
    <div >


      {/* <h1>ReactPlayer Demo</h1>
      <progress max={1} value={played} /> */}
      <div style={videoZone}>

        {/* subcam */}
        <video id='webcam'
            ref={recordWebcam.webcamRef}
            style={reactCamStyle}
            autoPlay
            muted
          />
          


        {/* main */}
        <ReactPlayer
          className="react-player"
          // width="100vw"
          // height="100vh"
          width={reactPlayer[1]}
          height={reactPlayer[2]}
          style={reactPlayerBackground}
          url={myVideo}
          playing={playing}
          muted={muted}
          onPlay={handlePlay}
          onPause={handlePause}
          onProgress={handleProgress}
          onEnded={challengeEnd}
        />

      
        <progress
          style={progressStyle}
          className="progressbar"
          max={1}
          value={played}
        />

  

        {/*  mode 1 */}
        <button  onClick={mode1} 
              style={mode1Style}
              disabled={reactPlayer[0]==='main'}
              >
        mode1
        </button>
        {/*  mode 2 */}
        <button  onClick={mode2} 
              style={mode2Style}
              disabled={reactPlayer[0]==='sub'}
              >
        mode2
        </button>


        {/* 타이머 영상녹화시작 */}
        <button  onClick={onClickReset} 
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
        <button  onClick={recordWebcam.stop} // onClick={recordWebcam.retake} 추가하기.
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

        {/* 다시찍기(녹화시작은 안함) */}
        <button
          disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
          onClick={recordWebcam.retake}
          style={retakeStyle}
        >
          Retake
        </button>  

        {/* timer & reset */}
          <h2 style={timerStyle}>{timer}</h2>
  

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
