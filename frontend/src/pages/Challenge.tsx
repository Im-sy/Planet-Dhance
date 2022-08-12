
import React, { CSSProperties, SetStateAction, useState, useEffect, useRef } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import { IconButton, Checkbox } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ArrowBack from '@mui/icons-material/ArrowBack';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import axios from 'axios';

import myVideo from '../videos/Patissiere_guide.mp4';
import myVideo2 from '../videos/anysong_guide.mp4';
import myVideo3 from '../videos/Forever1_guide.mp4';
import myVideo4 from '../videos/hot_guide.mp4';
import myVideo5 from '../videos/LoveDive_guide.mp4';
import myVideo6 from '../videos/pop_guide.mp4';
import myVideo7 from '../videos/PtoD_guide.mp4';
import myVideo8 from '../videos/SorrySorry_guide2.mp4';
import myVideo9 from '../videos/sparkling_guide.mp4';
import myVideo10 from '../videos/Tomboy_guide.mp4';
import myVideo11 from '../videos/TT_guide.mp4';

import '../styles/App.css';
import "../styles/styles.css";
import Emoji from '../components/Emoji';
import Thumnail from './Thumnail';
import NavBar from '../components/NavBar'
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';

//---------------------------------------------------------------------------------
//
//      webcam 부분 1/2
//
//---------------------------------------------------------------------------------
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
  aspectRatio : 2,
};

//---------------------------------------------------------------------------------
//
//      1. 전체 CSS
//
//---------------------------------------------------------------------------------
const progressStyle: CSSProperties = {
  position: 'absolute',
  // top: '10px',
  width: '100vw',
  height: '7px',
  backgroundColor: 'gray',
};


const videoZone: CSSProperties = {
  position: 'relative',
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



//---------------------------------------------------------------------------------
//
//      2. 모드 선택 부분 CSS : main <-> sub 바꾸는 부분  : mode
//
//---------------------------------------------------------------------------------

const subcamStyle: CSSProperties = {
  position: 'absolute',
  zIndex : '1',
  top: '5.5vh',
  left : '65vw',
  width: '35vw',
  height: '30vh',
  transform : 'scaleX(-1)',
};


const maincamStyle: CSSProperties = {
  position: 'absolute',
  top : '15vh',
  width: '100vw',
  height: '65vh',
  transform : 'scaleX(-1)',
  backgroundColor: 'rgba( 6, 3, 24, 1 )',
};

const subplayerStyle: CSSProperties = {
  position: 'absolute',
  top : '9vh',
  left : '65vw',
  width: '35vw',
  height: '5vh',
  backgroundColor: 'rgba( 6, 3, 24, 1 )',
};


const mainplayerStyle: CSSProperties = {
  position: 'absolute',
  backgroundColor: 'rgba( 6, 3, 24, 1 )',

};

const challengeStartStyle: CSSProperties = {
  position: 'absolute',
  top: '85vh',
  left: '35vw',
  width: '30vw',
  height: '5vh',
  border : '0',
  color : 'red'
};


const backToSongPageStyle: CSSProperties = {
  position: 'absolute',
  top: '5vh',
  left: '10px',
  width : '8vw',
  height : '8vw',
};

const muteStyle: CSSProperties = {
  position: 'absolute',
  top: '26vh',
  left: '5vw',
  width: '10vw',
  height: '10vw',
  border : '0',
  color : 'white'
};

const playPauseStyle: CSSProperties = {
  position: 'absolute',
  top: '45vh',
  left: '45vw',
  width: '10vw',
  height: '10vw',
  color : 'white'

};

const timerStyle: CSSProperties = {
  position: 'absolute',
  top: '400px',
  left: '200px',
  width: '10vw',
  height: '10vw',
};


const modeStyle: CSSProperties = {
  position: 'absolute',
  top: '20vh',
  left: '5vw',
  width: '10vw',
  height: '10vw',
  border : '0'
};

const mode2Style: CSSProperties = {
  position: 'absolute',
  top: '30vh',
  left: '5vw',
  width: '20vw',
  height: '10vh',
  backgroundColor: 'rgba( 0, 0, 255, 0.5 )',
  border : '0'
};


//---------------------------------------------------------------------------------
//
//      3. 챌린지 진행 부분 CSS : challenging
//
//---------------------------------------------------------------------------------


const backToModeStyle: CSSProperties = {
  position: 'absolute',
  top: '5vh',
  left: '10px',
  width : '8vw',
  height : '8vw',
  // backgroundColor: 'rgba( 255, 255, 255, 1 )',
  // border : '0'
};


//---------------------------------------------------------------------------------
//
//      3. 챌린지 끝난 부분 CSS : endChallenge 
//
//---------------------------------------------------------------------------------

const endChallengePlay : CSSProperties = {
  top : '40vh',
  left : '43vw'
}
const endChallengePlayHidden : CSSProperties = {
  display : 'none'
}

const endChallengePrev : CSSProperties = {
  position: 'absolute',
  top: '70vh',
  left: '30vw',
  width: '20vw',
  height: '10vh',
  backgroundColor: 'rgba( 0, 0, 255, 0.5 )',
  border : '0'
}
const endChallengeNext : CSSProperties = {
  position: 'absolute',
  top: '70vh',
  left: '50vw',
  width: '20vw',
  height: '10vh',
  backgroundColor: 'rgba( 0, 0, 255, 0.5 )',
  border : '0'
}
   



//---------------------------------------------------------------------------------
//
//      4. Interface
//
//---------------------------------------------------------------------------------

interface playProps {
  url: string;
  playing: boolean;
  muted: boolean;
  played: number;
  loaded: number;
}





export default function ModeChallengeTimer() {

//---------------------------------------------------------------------------------
//
//      5. 전체 페이지 상태 2 / 2 -  mode,  challenging, endChallenge 3가지 존재
//
//---------------------------------------------------------------------------------
let [now, setNow] = useState('mode');


//---------------------------------------------------------------------------------
//
//      6. webcam 부분 2/2 - webcam 생성 및 custom hook & 녹화 영상 Blob
//
//---------------------------------------------------------------------------------
  
  const recordWebcam: RecordWebcamHook = useRecordWebcam(OPTIONS);

  const [recordingVideo, setRecordingVideo] = useState<FormData>()


  // 웹캠 데이터 저장
  const getRecordingFileHooks = async () => {
    const blob = await recordWebcam.getRecording();
    console.log({ blob });

    // 데이터 서버에 전송하는 부분
    const file = new File([blob], 'video.webm', {
      type : "video/webm"
    });
    // console.log(file);
    
    const formData = new FormData();
    formData.append("inputFile", file, "ftfykfgh.webm");
    const jsonData = JSON.stringify({
      content: 'my test!'
    })
    const blob2 = new Blob([jsonData], {type : "application/json"});

    // formData.append("inputFile", mediaBlobUrl);
    console.log('jsonData ----',jsonData)
    formData.append("sampleJson", blob2);

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


//---------------------------------------------------------------------------------
//
//      7. 여러 곳에서 쓰이는 hook
//
//---------------------------------------------------------------------------------

// 안무티칭 & 모드선택 페이지로 뒤로가기
const backToMode = () => {
 
  // 1. challenging에서 가는 경우
  if (now==='challenging'){
    recordWebcam.stop();
    console.log('debug 1 == recording stop')
    
  }
  
  // 2. endChallenge에서 가는 경우
  else if (now==='endChallenge'){
    document.getElementById('webcam').style.display = "block";
    document.getElementById('prevcam').style.display = "none"
  }

  setTimeout(recordWebcam.retake,500);
  setPlayState({ ...playState, played: 0}); // 티handlePlayPausepla칭영상 새로시작1
  player.current.seekTo(0); // 티칭영상 새로시작1
  console.log(recordWebcam.status)
  setNow('mode');
  console.log('현재 state는 ', {now}, '입니다.')
  
};


//---------------------------------------------------------------------------------
//
//     8. ReactPlayer 관련 hook & data
//
//---------------------------------------------------------------------------------

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


const handlePlay = () => {
  console.log('handlePlay 함수 호출');

  if (recordWebcam.status !== CAMERA_STATUS.OPEN  )
  {recordWebcam.open()
    console.log('카메라 켜기')}


  if (playing===false){
    console.log('handlePlay 함수 실행');

    setPlayState({ ...playState, playing: true });
    
    // endChallenge에서는 실행되면 안됨
    if (now!=='endChallenge') {
      document.getElementById('webcam').style.display = "block";
      document.getElementById('prevcam').style.display = "none";
    }
    console.log('debug ' ,recordWebcam.status)
    if (recordWebcam.status !== CAMERA_STATUS.OPEN  )
    {recordWebcam.open()
      console.log('카메라 켜기')}
      
    };
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
  console.log('onProgress', inState);
  console.log('웹캠상태 :', recordWebcam.status);
  console.log('화면상태 :', now);
  setPlayState(inState as SetStateAction<playProps>);

  if (recordWebcam.status === CAMERA_STATUS.RECORDING){
    snap()
  }
};


const challengeEnd =  () => {
  clearInterval(Ref.current) // 타이머에 쌓인 것들 초기화
  console.log('안무티칭 영상이 끝났습니다. 웹캠의 현재상태 : ',recordWebcam.status)
  // recording이 아닐 때, 그냥 영상만 다 본 경우는 작동하지 않아야 함
  if (recordWebcam.status === CAMERA_STATUS.RECORDING)
  { 
    setNow('endChallenge')
    recordWebcam.stop();
    console.log('debug 2 == recording stop')
    console.log('안무티칭영상이 끝났습니다.')
    console.log(recordWebcam.status,'before stop')
    console.log('웹캠 녹화가 종료되었습니다.');
    console.log(recordWebcam.status,'after stop')



    // endChallenge page 관련
    setTimeout(()=>{
      // setNow('endChallenge')
      mode2()   // 1. 영상 위치 바꾸기
      document.getElementById('prevcam').style.display = "block";
      document.getElementById('webcam').style.display = "none";
    },1000)
  }

    
    // Blob 생성
    setTimeout(getRecordingFileHooks, 1000);

    console.log(now,'현재 상태')

}


//---------------------------------------------------------------------------------
//
//      9. mode에서 쓰이는 hook & data
//
//---------------------------------------------------------------------------------
  // 있어야 하는 데이터
  // ReactPalyer : width "35vw"/"100vh", height "50vw"/"100vh", style subplayerStyle/mainplayerStyle
  // video : maincamStyle/subcamStyle

  let [reactPlayer, reactPlayerChange] = useState(['main','100vw','100vh']);
  let [reactPlayerBackground, reactPlayerBackgroundChange] = useState(mainplayerStyle);
  let [reactCamStyle, reactCamStyleChange] = useState(subcamStyle);

  // 곡 선택페이지로 뒤로가기
  const backToSongPage = () => {
      setNow('mode')
      recordWebcam.close()
      
    };
  

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
      newData[2]='30vh'
      reactPlayerChange(newData);
      reactPlayerBackgroundChange(subplayerStyle);

      // 내 영상 부분
      reactCamStyleChange(maincamStyle);
    }

  }

//---------------------------------------------------------------------------------
//
//      10. mode에서 쓰이는 hook & data 2 - timer 만
//
//---------------------------------------------------------------------------------
    const Ref = useRef(null);
  
    // The state for our timer
    const [timer, setTimer] = useState(' ');

  
    const getTimeRemaining = (e:any) => {
        // console.log('getTimeRemaining and e : ', e)
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
      // console.log(Ref.current)
      let { total, hours, minutes, seconds } 
      = getTimeRemaining(e);
      console.log('debug 1 : total & second is', total, seconds)
        if (seconds >= 0) {
          //  console.log('debug 2 : total & seconds is ', total, seconds)
            setTimer(
                (hours > -1 ? ' ' : ' ') + 
                (minutes > -1 ? ' ': ' ' )+ 
                (seconds > -1 ? seconds : ' ')
            )
            
        }else if(seconds===-1){ // seconds===-1 로 안하면, 계속 실행됨
          // console.log('debug 3 : total & seconds is ',total, seconds)
          
          // 0초가 되면 타이머 사라짐
          setTimer(
            (hours > -1 ? ' ' : ' ') + 
            (minutes > -1 ? ' ': ' ' )+ 
            (seconds > -1 ? ' ' : ' ') )


            if (!(recordWebcam.status === CAMERA_STATUS.CLOSED ||
              recordWebcam.status === CAMERA_STATUS.RECORDING ||
              recordWebcam.status === CAMERA_STATUS.PREVIEW))
            {
              // console.log('time to start recording');

              // 타이머 완료시, 실행
              clearInterval(Ref.current)
              setNow('challenging');
              setPlayState({ ...playState, played: 0}); // 티칭영상 새로시작1
              // console.log('debug1')
              handlePlay()
              player.current.seekTo(0); // 티칭영상 새로시작1
              console.log(CAMERA_STATUS)
              console.log(recordWebcam.status)
              recordWebcam.start();  // 내 캠 녹화 시작
              clearInterval(Ref.current) // 타이머에 쌓인 것들 초기화
           }
        }
    }
  
  
    const clearTimer = (e:any) => {
        // 처음 시간 설정해 주는 부분
        console.log('clearTimer')
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
        console.log('getDeadTime')
        return deadline;
    }
  
    const onClickReset = () => {
        
        
        clearTimer(getDeadTime());
        console.log('onClickReset')
    }



 
//---------------------------------------------------------------------------------
//
//      11. endChallenge에서 쓰이는 hook 1 - 영상 재생 및 페이지 이동 관련
//
//---------------------------------------------------------------------------------


  
  
  const goToThumnail = () => {

    axios
    .post("http://i7d201.p.ssafy.io:8081/file/upload/file_json", recordingVideo)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      alert("실패");
      console.log(err)
    });
  }

  // 녹화한 영상 재생하기
  // 해야할 것 : 1. 영상 위치 바뀌어 있음 / 2. Reactplayer 다시 재생시키기 /  3.내 영상 재생 /4. 뒤로가기 버튼(setNow('mode'), previewRef->webcamRef)
  const playPrev = () => {
    console.log('playPrev')
    let video : HTMLVideoElement = document.querySelector('#prevcam');
    
    // 2. Reactplayer 다시 재생시키기
    setPlayState({ ...playState, played: 0}); // 티칭영상 새로시작1
    handlePlay()
    player.current.seekTo(0); // 티칭영상 새로시작1
    
    //  3. 내 녹화 영상 재생
    video.play();  //  
  }

//---------------------------------------------------------------------------------
//
//      12. endChallenge에서 쓰이는 hook & data 2 - 썸네일 관련
//
//---------------------------------------------------------------------------------
  let videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>();  // context = canvasRef.current.getContext('2d'); error 제거
  const [dimensions, setDimensions] = useState<any>({});
  const [thumbnail, setThumbnail] = useState([]);

  let context : any;
  if (canvasRef.current) {
    context = canvasRef.current.getContext('2d');
  }
 
  function getVideoSizeData(videoRef: React.MutableRefObject<any> ) {
    const ratio = videoRef.current.videoWidth / videoRef.current.videoHeight;
    const w = videoRef.current.videoWidth;
    const h = videoRef.current.videoHeight;
    return {
      ratio,
      w,
      h,
    };
  }


  useEffect(() => {
    
    console.log('--------------------정상작동-----------')
    const video = document.querySelector('video')  // 추가
    videoRef.current = video                       //추가
    // videoRef.current.onloadedmetadata=alert("Meta data for video loaded");
    // Add listener when the video is actually available for
    // the browser to be able to check the dimensions of the video.
    if (videoRef.current) {
      // console.log('if (videoRef.current) 통과')
      videoRef.current.addEventListener('loadedmetadata', function () {
        const { w, h } = getVideoSizeData(videoRef);
        canvasRef.current.width = w;
        canvasRef.current.height = h;
        setDimensions({
          w: w,
          h: h,
        });
      });
    }

  }, []);

  // snap으로 canvas에 그린 것을 blob으로 가져오는 것
  async function snap() {
    // console.log('snap run');
    // console.log('snap input time is : ',);
    // console.log('context  : ', context);
    // console.log('videoRef: ', videoRef);


      await context.fillRect(0, 0, dimensions.w, dimensions.h);
      await context.drawImage(
        videoRef.current,
        0,
        0,
        dimensions.w,
        dimensions.h
      );
      // console.log('context2 : ', context);
      const canvasHTML = document.querySelector('canvas');
      const imgURL = canvasHTML.toDataURL('image/png');
      // console.log([...thumbnail])
      setThumbnail([...thumbnail, imgURL]);
   
  };
// 썸네일 관련 끝----------------------------------------------------------------------------------------------------------



  return (
    <div >
       {/* ----------------------------------------------------------------------------------------
      //
      //            1. 썸네일 관련 
      //
      -----------------------------------------------------------------------------------------*/}
      <div >
        {/* <video id='thumnail_video'  ref={recordWebcam.webcamRef} muted autoplay /> */}
        {/* 썸네일 그려줌 */}
        <canvas id='canvas' hidden ref={canvasRef} />   
        {/* <button onClick={snap}>Take screenshot</button> */}
        {/* {thumbnail.map((imgBlobs, index) => {
          return <img key={index} src={imgBlobs} />;
        })} */}
    </div>


      {/* ----------------------------------------------------------------------------------------
      //
      //            2. 이모지 관련 
      //
      -----------------------------------------------------------------------------------------*/}
      <div> {/* recordWebcam.record() 가 완료된 후 , played=0 되도록? */} 
        {recordWebcam.status === CAMERA_STATUS.RECORDING  && played>=0.3 ? <Emoji emoji='💘'/> : ''}
        {recordWebcam.status === CAMERA_STATUS.RECORDING && played>=0.6 ? <Emoji emoji='😍'/> : ''}
        {recordWebcam.status === CAMERA_STATUS.RECORDING && played>=0.9 ? <Emoji emoji='🎉'/> : ''}
        {recordWebcam.status === CAMERA_STATUS.RECORDING && played >= 0.97 ? <Emoji emoji='💯'/> : ''}
      </div>


      {/* ----------------------------------------------------------------------------------------
      //
      //            3. ReactPlayer & webcam 관련 
      //
      -----------------------------------------------------------------------------------------*/}
      <div style={videoZone}>

        {/* webCam */}
        <video id='webcam'
            ref={recordWebcam.webcamRef}
            style={reactCamStyle}
            autoPlay
            muted
          />


        {/* prevCam */}
        <video id='prevcam'
            ref={recordWebcam.previewRef}
            style={reactCamStyle}
            muted
          />

   

  
        {/* main */}
        <ReactPlayer
          className="react-player"
          ref= {player}
          width={reactPlayer[1]}
          height={reactPlayer[2]}
          style={reactPlayerBackground}
          url={myVideo10} 
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

      </div>


 

      <div>
      {/* ----------------------------------------------------------------------------------------
      //
      //            4. mode 부분 컴포넌트
      //
      -----------------------------------------------------------------------------------------*/}
         {/*  mode 1 & 2 토글 버튼*/}
         {reactPlayer[0]==='main' ?
        <ChangeCircleOutlinedIcon  onClick={mode2} 
          style={ now ==='mode' ? modeStyle : notMode}
          > </ChangeCircleOutlinedIcon>
          : <ChangeCircleOutlinedIcon  onClick={mode1} 
          style={ now==='mode' ? modeStyle : notMode}
          >  </ChangeCircleOutlinedIcon>  }
       

        {/* 타이머 영상녹화시작 */}
        {/* <button disabled={recordWebcam.status !== CAMERA_STATUS.OPEN}> */}

        <RadioButtonCheckedOutlinedIcon  onClick={onClickReset} 
                  style={ now==='mode' && recordWebcam.status === CAMERA_STATUS.OPEN ? challengeStartStyle : notMode}
                  // disabled={ 
                    //   recordWebcam.status === CAMERA_STATUS.CLOSED ||
                    //   recordWebcam.status === CAMERA_STATUS.RECORDING ||
                    //   recordWebcam.status === CAMERA_STATUS.PREVIEW
                    // }
                    >
        </RadioButtonCheckedOutlinedIcon>
        {/* </button> */}
        

      {/* timer & reset */}
        <h2 style={timerStyle}>{timer}</h2>


      {/* 곡선택페이지로 뒤로가기 */}
        <ArrowBack
          onClick={backToSongPage}
          aria-label={playing ? 'pause' : 'play'}
          style = { now==='mode' ?  backToSongPageStyle : notMode  }
        />

      {/* 티칭 영상 재생/정지 */}
      <IconButton
          onClick={handlePlayPause}
          aria-label={playing ? 'pause' : 'play'}
        >
          {playing ? <PauseIcon style = { now==='mode' ?  playPauseStyle : notMode  }/> : <PlayArrowIcon style = { now==='mode' ?  playPauseStyle : notMode  }/>}
        </IconButton>


     {/* ----------------------------------------------------------------------------------------
      //
      //            5. challenging 부분 컴포넌트
      //
      -----------------------------------------------------------------------------------------*/}

      {/* 안무티칭 & 모드선택 페이지로 뒤로가기 */}
        <ArrowBack
          onClick={backToMode}
          aria-label={playing ? 'pause' : 'play'}
          style = { now==='challenging' ?  backToModeStyle : notChallenging  }
        />


     {/* ----------------------------------------------------------------------------------------
      //
      //            6. endChallenge 부분 컴포넌트
      //
      -----------------------------------------------------------------------------------------*/}
      
        {/* 내 영상 다시 보기*/}
        <IconButton
          onClick={playPrev} 
          style={ now==='endChallenge' && !playing ? endChallengePlay : notEndChallenge}>
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
      </div>

      
      
      
    {/* ----------------------------------------------------------------------------------------
      //
      // 7. navbar 부분 컴포넌트  - 아래 쪽이 너무 허전하면, NavBar 형식으로 무언가 넣을까 생각중..
      //
      -----------------------------------------------------------------------------------------*/}     
   
      {/* 챌린지용 navbar */}
      <div>
        {/* <NavBar/> */}
      </div>
    </div>
  );
}



 {/* 안쓰는 것
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
      </div> */}

      {/* <div>
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
       
       
       
         {/* mode 1 버튼 */}
        {/* <button  onClick={mode1} 
              style={ now==='mode' ? mode1Style : notMode}
              disabled={reactPlayer[0]==='main'}
              >
        mode1
        </button> */}
        {/*  mode 2 버튼 */}
        {/* <button  onClick={mode2} 
              style={ now ==='mode' ? mode2Style : notMode}
              disabled={reactPlayer[0]==='sub'}
              >
        mode2
        </button> */}