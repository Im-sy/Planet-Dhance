import React, {
  CSSProperties,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { videoListProps, contentItem } from './MyPage';
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
export interface artistItem {
  tagId: number,
  imgUrl: string,
}
interface mainProps {
  artistList: artistItem[];
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
  clearCnt: number;
}

export default function Main() {
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(false); // 추가 데이터를 로드하는지 아닌지를 담기위한 state
  const [pageNum, setPageNum] = useState<number>(0)
  const [lastPage, setLastPage] = useState<boolean>(false)
  const [videoList, setVideoList] = useState<contentItem[]>()

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    // console.log(scrollTop, clientHeight, scrollHeight)
    if (scrollTop + clientHeight + 21 >= scrollHeight && fetching === false) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      console.log('end')
      fetchMoreSearchInfo();
    }
  };
  
  const fetchMoreSearchInfo = async () => {
    // 추가 데이터를 로드하는 상태로 전환
    setFetching(true);
    console.log(lastPage)
    if (!lastPage) {
      const scrollsearch = await mainVideo(pageNum+1)
      console.log(scrollsearch)
      setPageNum(pageNum+1)
      setVideoList(videoList?.concat(...scrollsearch.videoList?.content))
      setLastPage(scrollsearch.videoList?.last)
    }

    // 추가 데이터 로드 끝
    setFetching(false)
  };

  
  useEffect(() => {
    const getMainVideo = async () => {
      const getMain = await mainVideo(0);
      setMainVideoInfo(getMain);
      setVideoList(getMain.videoList?.content)
    };
    getMainVideo();
  }, []);

  useEffect( () => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", handleScroll);
    };
  })
  
  const [mainVideoInfo, setMainVideoInfo] = useState<mainProps>();
  const handleRankClick = () => {
    navigate('/ranking', {state: {scores: mainVideoInfo?.rankingList}})
  }

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
          <IconButton onClick={handleRankClick} color="secondary">
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
            width: '98%',
            height: '100%',
          }}
        >
          {/* 가로카드 */}
          <div>
            <VerticalCardList artistList={mainVideoInfo?.artistList} />
          </div>
          {/* GridView */}
          <div>
            <h2> Hot Clips</h2>
            <GridView
              prevPage={mainVideoInfo?.prevPage}
              videoList={videoList && videoList}
            />
          </div>
        </div>
      </div>

      {/* NavBar - 제일 하단에 두기!*/}
      <NavBar current={'main'} />
    </div>
  );
}
