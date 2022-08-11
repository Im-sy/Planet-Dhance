
import React, { CSSProperties, SetStateAction, useState, useEffect, useRef } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import { IconButton, Checkbox } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ArrowBack from '@mui/icons-material/ArrowBack';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import axios from 'axios';
import myVideo from '../videos/IMG_0960.mp4';
// import myVideo from '../videos/test.mp4';
import '../styles/App.css';
import "../styles/styles.css";
import Emoji from '../components/Emoji';


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
import { CloseFullscreenOutlined } from '@mui/icons-material';


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


// endChallenge -------------------------------------
const endChallengePlay : CSSProperties = {
  top : '40vh',
  left : '43vw'
}
const endChallengePlayHidden : CSSProperties = {
  display : 'none'
}

const endChallengePrev : CSSProperties = {
  position: 'absolute',
  // top: '10px',
  // left: '10px',
  // width: '20px',
  // height: '10px',
  top: '70vh',
  left: '30vw',
  width: '20vw',
  height: '10vh',
  backgroundColor: 'rgba( 0, 0, 255, 0.5 )',
  border : '0'
}
const endChallengeNext : CSSProperties = {
  position: 'absolute',
  // top: '10px',
  // left: '10px',
  // width: '20px',
  // height: '10px',
  top: '70vh',
  left: '50vw',
  width: '20vw',
  height: '10vh',
  backgroundColor: 'rgba( 0, 0, 255, 0.5 )',
  border : '0'
}
   

/*------------------------------------------------------
  


---------------------------------------------------*/
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
  // webcam 부분 2-------------------------------------------
  const recordWebcam: RecordWebcamHook = useRecordWebcam(OPTIONS);

  
  const [recordingVideo, setRecordingVideo] = useState<FormData>()

  const getRecordingFileHooks = async () => {
    const blob = await recordWebcam.getRecording();
    console.log({ blob });

    // 서버에 전송
    const file = new File([blob], 'video.webm', {
      type : "video/webm"
    });
    console.log(file);
    
    let formData = new FormData();
    formData.append("inputFile", file, "ftfykfgh.webm");
    const jsonData = JSON.stringify({
      content: 'my test!',
    })
    formData.append("sampleJson", jsonData);

    // formData.append("inputFile", mediaBlobUrl);
    console.log(file);

    setRecordingVideo(formData)
    
    // endChallenge에서 Next 눌러서, Thumnailpage 로 갈 때, 전송
    // axios
    //   .post("http://i7d201.p.ssafy.io:8081/file/upload", formData)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     alert("실패");
    //     console.log(err)
    //   });


  };

  
  // 전체 페이지 상태 2 / 2 -  mode,  challenging, endChallenge
  let [now, setNow] = useState('mode');


  // 곡선택페이지로 뒤로가기
  const backToSongPage = () => {
    setNow('mode')
    recordWebcam.close()
  };

  // 안무티칭 & 모드선택 페이지로 뒤로가기
  const backToMode = () => {
 
    // 1. challenging에서 가는 경우
    if (now==='challenging'){
      recordWebcam.stop();
      
    }
    
    // 2. endChallenge에서 가는 경우
    else if (now==='endChallenge'){
      document.getElementById('webcam').style.display = "block";
      document.getElementById('prevcam').style.display = "none"
    }

    setTimeout(recordWebcam.retake,500);
    setPlayState({ ...playState, played: 0}); // 티칭영상 새로시작1
    player.current.seekTo(0); // 티칭영상 새로시작1
    console.log(recordWebcam.status)
    setNow('mode');
    console.log('현재 state는 ', {now}, '입니다.')
    
  };
  
  const goToThumnail = () => {

    axios
    .post("https://i7d201.p.ssafy.io:8081/file/upload/file_json", recordingVideo)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      alert("실패");
      console.log(err)
    });
  }

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



  

  //--------------------------------------------------------------------------------------------
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
              handlePlay()
              player.current.seekTo(0); // 티칭영상 새로시작1
              console.log('debug1')
              console.log(CAMERA_STATUS)
              console.log(recordWebcam.status)
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

    // endChallenge에서는 실행되면 안됨
    if (now!=='endChallenge') {
      document.getElementById('webcam').style.display = "block";
      document.getElementById('prevcam').style.display = "none";
    }
    
    if (recordWebcam.status !== CAMERA_STATUS.OPEN )
      {recordWebcam.open()
      console.log('카메라 켜기')}
 
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
    console.log('웹캠상태 :', recordWebcam.status);
    console.log('화면상태 :', now);
    setPlayState(inState as SetStateAction<playProps>);
  };

  const challengeEnd =  () => {
    console.log('안무티칭 영상이 끝났습니다. 웹캠의 현재상태 : ',recordWebcam.status)
    // recording이 아닐 때, 그냥 영상만 다 본 경우는 작동하지 않아야 함
    if (recordWebcam.status === CAMERA_STATUS.RECORDING)
      { 
      recordWebcam.stop();
      console.log('안무티칭영상이 끝났습니다.')
      console.log(recordWebcam.status,'before stop')

      // recordWebcam.download();
      console.log('웹캠 녹화가 종료되었습니다.');
      console.log(recordWebcam.status,'after stop')
      setTimeout(getRecordingFileHooks, 1000);


      // endChallenge page 관련
      setTimeout(()=>{
        setNow('endChallenge')
        mode2()   // 1. 영상 위치 바꾸기
        document.getElementById('prevcam').style.display = "block";
        document.getElementById('webcam').style.display = "none";
      },1000)
      // setNow('endChallenge')
      // mode2()  
      // document.getElementById('prevcam').style.display = "block";
      // document.getElementById('webcam').style.display = "none";
     }
      console.log(now,'현재 상태')  
  }

 


  // endChallenge
  // 녹화한 영상 재생하기
  // 해야할 것 : 1. 영상 위치 바뀌어 있음 / 2. Reactplayer 다시 재생시키기 /  3.내 영상 재생 /4. 뒤로가기 버튼(setNow('mode'), previewRef->webcamRef)
  const playPrev = () => {
    let video : HTMLVideoElement = document.querySelector('#prevcam');
    
    // 2. Reactplayer 다시 재생시키기
    setPlayState({ ...playState, played: 0}); // 티칭영상 새로시작1
    handlePlay()
    player.current.seekTo(0); // 티칭영상 새로시작1
    
    //  3.내 영상 재생
    video.play();  //  
  }

  return (
    <div >
      {/* 이모지 관련 */}
      <div>
        {recordWebcam.status === CAMERA_STATUS.RECORDING  && played>=0.3 ? <Emoji emoji='💘'/> : ''}
        {recordWebcam.status === CAMERA_STATUS.RECORDING && played>=0.6 ? <Emoji emoji='😍'/> : ''}
        {recordWebcam.status === CAMERA_STATUS.RECORDING && played>=0.9 ? <Emoji emoji='🎉'/> : ''}
        {recordWebcam.status === CAMERA_STATUS.RECORDING && played >= 0.99 ? <Emoji emoji='💯'/> : ''}
        
      </div>

      <div style={videoZone}>

        {/* webCam */}
        <video id='webcam'
            ref={recordWebcam.webcamRef}
            // ref={webOrPrev}
            // ref={recordWebcam.previewRef}
            style={reactCamStyle}
            autoPlay
            muted
          />

        {/* prevCam */}
        <video id='prevcam'
            ref={recordWebcam.previewRef}
            style={reactCamStyle}
            // autoPlay
            // controls
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
        
        {/*  endChallenge  */}
      
        {/* 내 영상 다시 보기*/}
        <IconButton
          onClick={playPrev} 
          style={ now==='endChallenge' && !playing ? endChallengePlay : notMode}>
          <PlayArrowIcon />

        </IconButton>

        {/* Prev : 모드 선택하는 곳으로 이동 */}
             <button  onClick={backToMode} 
              style={ now ==='endChallenge' ? endChallengePrev : notEndChallenge  }
              >
          Prev
        </button>

        {/* Next : 썸네일 선택하는 곳으로 이동 */}
           <button  onClick={goToThumnail} 
              style={ now ==='endChallenge' ? endChallengeNext : notEndChallenge  }
              >
          Next
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

