
import React, { CSSProperties, SetStateAction, useState, useEffect, useRef } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import { IconButton, Checkbox } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ArrowBack from '@mui/icons-material/ArrowBack';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

// import myVideo from './videos/IMG_0960.mp4';
import myVideo from '../videos/IMG_0960.mp4';
import '../styles/App.css';
import "../styles/styles.css";


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


const OPTIONS: RecordWebcamOptions = {
  // 위치 찾아보기
  filename: "test-filename",
  fileType: "mp4",
  width: 360,
  height: 800,
  aspectRatio : 1,
};

// 전체 페이지 상태 1 / 2
const notMode : CSSProperties = {
  display : 'none'
};

const notChallenging : CSSProperties = {
  display : 'none'
};

const notEndChallenge : CSSProperties = {
  display : 'none'
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
  transform : 'scaleX(-1)'
};


const maincamStyle: CSSProperties = {
  position: 'absolute',
  width: '100vw',
  height: '100vh',
  transform : 'scaleX(-1)',
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


const backToSongPageStyle: CSSProperties = {
  position: 'absolute',
  top: '100px',
  left: '10px',
  // width: '90px',
  // height: '40px',
  // backgroundColor: 'rgba( 255, 255, 255, 1 )',
  // border : '0'
};

const backToModeStyle: CSSProperties = {
  position: 'absolute',
  top: '100px',
  left: '10px',
  // width: '90px',
  // height: '40px',
  // backgroundColor: 'rgba( 255, 255, 255, 1 )',
  // border : '0'
};

const playPauseStyle: CSSProperties = {
  position: 'absolute',
  top: '50vh',
  left: '50vw',
  fontSize : '3rem',
};

const muteStyle: CSSProperties = {
  position: 'absolute',
  top: '60vh',
  left: '50vw',
  fontSize : '2rem',
};


const timerStyle: CSSProperties = {
  position: 'absolute',
  top: '400px',
  left: '200px',
  width: '90px',
  height: '40px',
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
  // 전체 페이지 상태 2 / 2
  let [now, setNow] = useState('mode');


  // 곡선택페이지로 뒤로가기
  const backToSongPage = () => {
    setNow('mode')
    recordWebcam.close()
  };

  // 안무티칭 & 모드선택 페이지로 뒤로가기
  const backToMode = () => {
    setNow('mode');
    console.log('현재 state는 ', {now}, '입니다.')
    recordWebcam.stop();
    // recordWebcam.retake();
    setTimeout(recordWebcam.retake,500);
    setPlayState({ ...playState, played: 0}); // 티칭영상 새로시작1
    player.current.seekTo(0); // 티칭영상 새로시작1
    console.log(recordWebcam.status)
    
    
  };


  //--------------------------------------------------
  // 모드 변경 부분
  // 있어야 하는 데이터
  // ReactPalyer : width "35vw"/"100vh", height "50vw"/"100vh", style subplayerStyle/mainplayerStyle
  // video : maincamStyle/subcamStyle

  let [reactPlayer, reactPlayerChange] = useState(['main','100vw','100vh']);
  let [reactPlayerBackground, reactPlayerBackgroundChange] = useState(mainplayerStyle);
  let [reactCamStyle, reactCamStyleChange] = useState(subcamStyle);


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
      // 타이머 시작시, 페이지 설정 변경  
      


        let { total, hours, minutes, seconds } 
                    = getTimeRemaining(e);
        if (seconds >= 0) {
           console.log(seconds)
            setTimer(
                (hours > -1 ? ' ' : ' ') + 
                (minutes > -1 ? ' ': ' ' )+ 
                (seconds > -1 ? seconds : ' ')
            )
            
        }else if(seconds===-1){ // seconds===-1 로 안하면, 계속 실행됨
          console.log(total, seconds)
          
          // 0초가 되면 타이머 사라짐
          setTimer(
            (hours > -1 ? ' ' : ' ') + 
            (minutes > -1 ? ' ': ' ' )+ 
            (seconds > -1 ? ' ' : ' ') )


            if (!(recordWebcam.status === CAMERA_STATUS.CLOSED ||
              recordWebcam.status === CAMERA_STATUS.RECORDING ||
              recordWebcam.status === CAMERA_STATUS.PREVIEW))
            {
              console.log('time to start recording');

              // 타이머 완료시, 실행
              setPlayState({ ...playState, played: 0}); // 티칭영상 새로시작1
              player.current.seekTo(0); // 티칭영상 새로시작1
              recordWebcam.start();  // 내 캠 녹화 시작
           }
        }
    }
  
  
    const clearTimer = (e:any) => {
        // 처음 시간 설정해 주는 부분
        setTimer('3');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
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
  
    const onClickReset = () => {
        setNow('challenging');
        clearTimer(getDeadTime());
    }

  //----------------------------------------------------------------------------

  const player = useRef(null);


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
    recordWebcam.open();
    console.log('카메라 켜기')
 
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

  const challengeEnd = () => {
    setNow('endChallenge')
    console.log('안무티칭영상이 끝났습니다.')
    // asyn await promise then
    recordWebcam.stop();
    // recordWebcam.download();
    console.log('웹캠 녹화가 종료되었습니다.');
    setTimeout(recordWebcam.download, 1000);
    setTimeout(getRecordingFileHooks, 1000);
    // setTimeout(()=> {const test = recordWebcam.download()
    
    // console.log(test)},100);

    // const test = recordWebcam.download()
    // console.log("test", test)
  
    // document.getElementById('webcam').style.visibility = "hidden";
  }

  return (
    <div >
      <div style={videoZone}>

        {/* webCam */}
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
          ref= {player}
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

  
        {/*  mode 1 버튼*/}
        <button  onClick={mode1} 
              style={ now==='mode' ? mode1Style : notMode}
              disabled={reactPlayer[0]==='main'}
              >
        mode1
        </button>
        {/*  mode 2 버튼 */}
        <button  onClick={mode2} 
              style={ now ==='mode' ? mode2Style : notMode}
              disabled={reactPlayer[0]==='sub'}
              >
        mode2
        </button>


        {/* 타이머 영상녹화시작 */}
        <button  onClick={onClickReset} 
                  style={ now==='mode' ? challengeStartStyle : notMode}
                  disabled={
                    recordWebcam.status === CAMERA_STATUS.CLOSED ||
                    recordWebcam.status === CAMERA_STATUS.RECORDING ||
                    recordWebcam.status === CAMERA_STATUS.PREVIEW
                  }>
            챌린지 시작
        </button>


        {/* timer & reset */}
          <h2 style={timerStyle}>{timer}</h2>
  

      </div>


      <div>
        {/* 곡선택페이지로 뒤로가기 */}
        <ArrowBack
          onClick={backToSongPage}
          aria-label={playing ? 'pause' : 'play'}
          style = { now==='mode' ?  backToSongPageStyle : notMode  }
        />

        {/* 안무티칭 & 모드선택 페이지로 뒤로가기 */}
        <ArrowBack
          onClick={backToMode}
          aria-label={playing ? 'pause' : 'play'}
          style = { now==='challenging' ?  backToModeStyle : notChallenging  }
        />
    

        <IconButton
          onClick={handlePlayPause}
          aria-label={playing ? 'pause' : 'play'}
          style = { now==='mode' ?  playPauseStyle : notMode  }
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

        <IconButton
          onClick={handleToggleMuted}
          aria-label={muted ? 'off' : 'on'}
          style = { now==='mode' ? muteStyle : notMode }
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



{/* 안쓰는 버튼들------------------------------------ */}
        //   mute
        {/* <Checkbox
          checked={muted}
          onChange={handleToggleMuted}
          icon={<VolumeUpIcon />}
          checkedIcon={<VolumeOffIcon />}
        /> */}

         {/* 영상녹화중단 -> 추후에 자동 중단으로 바꾸기*/}
         {/* <button  onClick={recordWebcam.stop} 
                   style={challengeEndStyle}
                   disabled={recordWebcam.status !== CAMERA_STATUS.RECORDING}>
             챌린지 종료
         </button> */}

        {/* 영상저장 -> 챌린지 후에 저장화면 */}
        {/* <button
            disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
            onClick={recordWebcam.download}
            style={saveStyle}
          >
            Download
          </button> */}

        {/* 다시찍기(녹화시작은 안함) */}
        {/* <button
          disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
          onClick={recordWebcam.retake}
          style={retakeStyle}
        >
          Retake
        </button>   */}
{/* 안쓰는 버튼들 끝------------------------------------ */}
