import React, {
  CSSProperties,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { videoListProps } from './MyPage';
import { mainVideo } from '../components/API/MusicService';
import ActionAreaCard from '../components/Card';
import Carousel from '../components/Carousel';
import RankScore from '../components/RankScore';
import Planet from '../components/Planet';
import GridView from '../components/GridView';
import NavBar from '../components/NavBar';
import TopBar from '../components/TopBar';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import '../styles/styles.css';
import VerticalCardList from '../components/VerticalCardList';

// 전체 페이지의 패딩 유무 스타일
// const paddingStyle : CSSProperties = {
//   margin: '0',
//   // padding : '0.1vh 0 0 0',
//   padding : '5vh 1vh 0 1vh',

// };

interface mainProps {
  rankingList: rankingItem[];
  prevPage: string;
  videoList: videoListProps;
}
export interface rankingItem {
  nationName: string;
  nationFlag: string;
  x: number;
  y: number;
  z: number;
  point: number;
}

export default function Main() {
  // const getMainVideo = async () => {
  //   const getMain = await mainVideo()
  //   setMainVideoInfo(getMain)
  // }

  useEffect(() => {
    const getMainVideo = async () => {
      const getMain = await mainVideo(0);
      setMainVideoInfo(getMain);
    };
    getMainVideo();
  }, []);

  const [mainVideoInfo, setMainVideoInfo] = useState<mainProps>();

  return (
    <div>
      <div>
        <TopBar />
      </div>

      {/* 상단 캐로셀 */}
      <Carousel />

      {/* ranking */}
      <div>
        <div>
          <span>Ranking</span>
          {/* 네비게이트 써서 랭킹 데이터 넘기기 */}
          <IconButton color="secondary" component={Link} to="/ranking">
            <AddIcon />
          </IconButton>
        </div>
        <RankScore scores={mainVideoInfo?.rankingList} />
        <Planet />
        <div
          style={{
            position: 'absolute',
            top: '40rem',
            backgroundColor: '#060318ff',
            width: '100%',
            height: '100%',
          }}
        >
          {/* 가로카드 */}
          <div>
            <VerticalCardList />
          </div>
          {/* GridView */}
          <div>
            <h2> Hot Clips</h2>
            <GridView
              prevPage={mainVideoInfo?.prevPage}
              videoList={mainVideoInfo?.videoList?.content}
            />
          </div>
        </div>
      </div>

      {/* NavBar - 제일 하단에 두기!*/}
      <NavBar current={'main'} />
    </div>
  );
}
