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
import myVideo from '../videos/Patissiere_guide.mp4';

import '../styles/tailwind_reset.css';

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
  useEffect(() => {
    console.log(props);
  }, [props]);
  
  const [playState, setPlayState] = useState<playStateProps>({
    playing: true,
    muted: true,
    played: 0,
  });
  const { played } = playState;
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
    const inState = {
      ...playState,
      ...state,
    };
    // console.log('onProgress', inState);
    setPlayState(inState as SetStateAction<playStateProps>);
  };

  const playEnd = () => {};

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
          width="98vw"
          height="94vh"
          loop
          style={playerStyle}
          url={`https://i7d201.p.ssafy.io/${videoItem?.videoUrl}`}
          playing={playing}
          muted={muted}
          onPlay={handlePlay}
          onPause={handlePause}
          onProgress={handleProgress}
          onEnded={playEnd}
        />
      </div>
      {/* <HashTagList tagList={videoItem.tagList} /> */}
      {/* <BtnLike like={videoItem.like} /> */}
    </div>
  );
}

export default PlayingPage;
