import React, {
  CSSProperties,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import { useLocation } from 'react-router-dom';
import { videoListProps } from './MyPage';
import { playVideo } from '../components/API/MusicService';
import { useSelector } from 'react-redux';
import { rootState } from '../reducer';
import HashTagList from '../components/HashTagList';
import axios from 'axios';
import myVideo from '../videos/Patissiere_guide.mp4';
import '../styles/tailwind_reset.css'

export interface tagItemProps {
  id: number,
  type: string,
  className: string
}
interface videoItemProps {
  videoId: number,
  musicId: number,
  hit: number,
  videoUrl: string,
  like: boolean,
  likeCnt: number,
  tagList: tagItemProps[],
}
interface playListProps {
  videoList: videoItemProps[]
}

const playerStyle: CSSProperties = {
  position: 'absolute',
  width: '98vw',
  height: '95vh',
  transform: 'scaleX(-1)',
  backgroundColor: 'black',
  // backgroundColor: 'green',
};

const progressStyle: CSSProperties = {
  position: 'absolute',
  top: '5vh',
  width: '98vw',
  height: '10px',
  backgroundColor: 'gray',
  zIndex: '100'
};

const videoZone: CSSProperties = {
  position: 'relative',
};


interface playProps {
  url: string;
  playing: boolean;
  played: number;
  muted: boolean;
}


export default function PlayingPage( props : playProps ){
  const location = useLocation();
  const state = location.state as {prevPage: string; videoId: number;}
  const prevPage = state.prevPage
  const videoId = state.videoId

  const [playState, setPlayState] = useState<playProps>({
    url: '',
    playing: true,
    muted: true,
    played: 0,
  });
  const {played} = playState;
  const { url, playing,muted } = props;

  const {isAuthenticated, user} = useSelector(
    (state: rootState) => state.authReducer
  );

  useEffect(() =>{
    const getPlayList = async () => {
      const getplaylist = await playVideo(0, prevPage, user.userId)
      setPlayListInfo(getplaylist)
    }
    getPlayList()
  },[])
  const [playListInfo, setPlayListInfo] = useState<playListProps>()

  const handlePlay = () => {
    console.log('handlePlay');
    setPlayState({ ...playState, playing: true });
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
    // console.log('onProgress', inState);
    setPlayState(inState as SetStateAction<playProps>);
  };

  const playEnd = () =>{

  }

  return (
    <div style={videoZone}>
      <progress
        style={progressStyle}
        className="progressbar"
        max={1}
        value={played}
      />
      <ReactPlayer
        className="react-player"
        width="98vw"
        height="94vh"
        loop
        style={playerStyle}
        url={myVideo}
        playing={playing}
        muted={muted}
        onPlay={handlePlay}
        onPause={handlePause}
        onProgress={handleProgress}
        onEnded={playEnd}
      />
      {/* <HashTagList tagList={playListInfo.tagList} /> */}
    </div>
  )
}