import React, {
  CSSProperties,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import { videoItemProps } from './ExplorePageList';
import HashTagList from '../components/HashTagList';
import BtnLike from '../components/UI/btnLike';
import GoBack from '../components/UI/goBack';
import GoDance from '../components/UI/goDance';
import myVideo from '../videos/Patissiere_guide.mp4';
import { useSelector } from 'react-redux';
import { rootState } from '../reducer';
import '../styles/tailwind_reset.css';
import {addHit} from '../components/API/ComService'


const playerStyle: CSSProperties = {
  position: 'absolute',
  width: '96vw',
  height: '80vh',
  transform: 'scaleX(-1)',
  backgroundColor: 'black',
  // backgroundColor: 'green',
};

const likeBtnStyle: CSSProperties = {
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
  width: '96vw',
  height: '10px',
  backgroundColor: 'gray',
  zIndex: '100',
};

const videoZone: CSSProperties = {
  position: 'relative',
};

interface playProps {
  playing: boolean;
  muted: boolean;
  videoItem: videoItemProps;
}
interface playStateProps {
  playing: boolean;
  muted: boolean;
  played: number;
}


function PlayingPage(props: playProps) {
  const { isAuthenticated, user } = useSelector(
    (state: rootState) => state.authReducer
  );
  
  const [playState, setPlayState] = useState<playStateProps>({
    playing: true,
    muted: true,
    played: 0,
  });
  const { played } = playState;
  useEffect(() => {
    console.log(played);
  }, [playState.played]);
  const { playing, muted, videoItem } = props;
  console.log(videoItem);

  const handlePlay = () => {
    console.log('handlePlay');
    setPlayState({ ...playState, playing: true });
  };
  const handlePause = () => {
    console.log('onPause');
    setPlayState({ ...playState, playing: false });
  };
  
  const handleProgress = (state: ReactPlayerProps) => {
    console.log(state)
    const inState = {
      ...playState,
      played: state.played as number
    };
    console.log('onProgress', inState);
    setPlayState(inState as SetStateAction<playStateProps>);
  };

  const playEnd = () => {
    console.log('END!@!@!@@!@!@!@!@')
    addHit(videoItem?.videoId)
    setPlayState({ ...playState, playing: true, played: 0 });
  };

  return (
    <div style={videoZone}>
      <div>
        <progress
          style={progressStyle}
          className="progressbar"
          max={1}
          value={played}
        />
        <ReactPlayer
          className="react-player"
          width="96vw"
          height="80vh"
          // loop
          style={playerStyle}
          url={`https://i7d201.p.ssafy.io/${videoItem?.videoUrl}`}
          playing={playing}
          muted={!muted}
          onPlay={handlePlay}
          onPause={handlePause}
          onProgress={handleProgress}
          onDuration={(state) => {console.log(state)}}
          onEnded={playEnd}
        />
  
      </div>
      <GoDance musicId={videoItem.musicId}/>
      <HashTagList tagList={videoItem.tagList} />
      <GoBack />
      <BtnLike like={videoItem.like} userId={user.userId} videoId={videoItem.videoId}/>
    </div>
  );
}

export default PlayingPage;
