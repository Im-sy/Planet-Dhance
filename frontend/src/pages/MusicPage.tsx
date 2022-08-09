import React, { CSSProperties, SetStateAction, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import ActionAreaCard from '../components/Card';
import SongPageTabs from '../components/MusicPageTab';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import myVideo from './videos/sparkling.mp4';
import { IconButton, Checkbox } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import "../styles/styles.css";
import NavBar from '../components/NavBar'

interface playProps {
  url: string;
  playing: boolean;
  muted: boolean;
  played: number;
  loaded: number;
}

export default function SongPage() {

  

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
    console.log({playing})
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

  const mvLetterStyle: CSSProperties = {
    marginBottom : 0,
    marginTop : 0,
    color : 'blue',
  };


  const infoBox: CSSProperties = {
    position: 'absolute',
    zIndex : '1',
    top: '14rem',
    width : '100vw',
    height : '2rem',
    backgroundColor: 'rgba( 0, 0, 0, 0.5 )',

  };

  const muteStyle : CSSProperties = {
    position: 'absolute',
    top: '13.8rem',
    left : '2rem',
    // color : 'white'

  };

  const buttonDivStyle: CSSProperties = {
    // marginTop : '30vw',
    // marginLeft : '25vw',
    marginTop : '1.8rem',
    marginLeft : '6.35rem',
    marginRight : '6.35rem',
    marginBottom : '1.8rem'

    // backgroundColor: 'rgba( 0, 255, 255, 1 )',
    // border : '0'
  };


  const hitStyle: CSSProperties = {
    position: 'absolute',
    // top: '30vh',
    // left: '25vw',
    // width: '25vw',
    // height: '5vh',
    // marginLeft : '6.35rem',
    top: '17.2rem',
    left: '6.35rem',
    // width: '6.35rem',
    // height: '2.85rem',
    // backgroundColor: 'rgba( 0, 255, 255, 1 )',
    // border : '0'
  };

  const hitSorting = () => {
    console.log('hitSorting');
    // setPlayState({ ...playState, playing: false });
  };

  const lastestStyle: CSSProperties = {
    // position: 'absolute',
    // top: '30vh',
    // left: '25vw',
    // width: '25vw',
    // height: '5vh',
    // top: '17.2rem',
    // left: '12.7rem',
    width: '6.35rem',
    height: '2.85rem',
    backgroundColor: 'rgba( 0, 255, 255, 1 )',
    // border : '0'
  };
  
  const gridViewStyle: CSSProperties = {
    marginLeft : "0.5rem",
    marginRight : "0.5rem"
    // position: 'absolute',
    // top: '30vh',
    // left: '25vw',
    // width: '25vw',
    // height: '5vh',
    // top: '17.2rem',
    // left: '12.7rem',
    // width: '6.35rem',
    // height: '2.85rem',
    // backgroundColor: 'rgba( 0, 255, 255, 1 )',
    // border : '0'
  };

 let [timeoutStorage, setTimeoutStorage] = useState([])

  const visibleInfoBox = () => {
      console.log("visibleInfoBox")
      document.getElementById('infoBox').style.visibility = "visible";
      const myTimeout = setTimeout(hiddenInfoBox, 3000);
      
      let newDate = [...timeoutStorage, myTimeout]
      setTimeoutStorage(newDate)

      console.log(timeoutStorage)
  };


  const hiddenInfoBox = () => {
      timeoutStorage.forEach((item)=>clearTimeout(item))
      console.log("hiddenInfoBox")
      document.getElementById('infoBox').style.visibility = "hidden";
  };

  useEffect(hiddenInfoBox,[])

 


  return (
    <div>
      <div>
        <h3 style={mvLetterStyle}>MV</h3>
        <ReactPlayer
          className="react-player"
          // width="99.5vw"
          // height="25vh"
          width="98vw"
          height="14.4rem"
          // style={reactPlayerBackground}
          // url={myVideo}
          url="https://www.youtube.com/watch?v=lDV5cM9YE4g"
          config={{
            youtube: {
                playerVars: {fs: 0, modestbranding:1}
            }
          }}
          playing={playing}
          // loop
          muted={muted}
          onClick={visibleInfoBox}
          onPlay={handlePlay}
          onPause={handlePause}
          onProgress={handleProgress}
          // onEnded={challengeEnd}
        />
        
        <div style={infoBox} id="infoBox">

        <IconButton style={{ color : 'white'}}
          onClick={handlePlayPause}
          aria-label={playing ? 'pause' : 'play'}
          // style={startStyle}

        >
          {playing ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>


        <IconButton style={{ color : 'white'}}
          onClick={handleToggleMuted}
          aria-label={muted ? 'off' : 'on'}
      
        >
          {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </IconButton>

        </div>
      </div>

      <SongPageTabs />

      {/* Navbar */}
      <NavBar />
    </div>
  )
}
