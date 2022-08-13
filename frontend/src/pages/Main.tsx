import React, {
  CSSProperties,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import {Link} from 'react-router-dom';
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

// 전체 페이지의 패딩 유무 스타일
// const paddingStyle : CSSProperties = {
//   margin: '0',
//   // padding : '0.1vh 0 0 0',
//   padding : '5vh 1vh 0 1vh',
  
// };

export default function Main() {
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
          <IconButton color="secondary" component={Link} to='/ranking'>
            <AddIcon />
          </IconButton>
        </div>
        <RankScore />
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
            <p>#BTS</p>
            <ActionAreaCard
              url="https://cdn.pixabay.com/photo/2019/06/20/09/26/underwater-4286600_960_720.jpg"
              width="8.438rem"
              height="15rem"
            />
          </div>
          {/* GridView */}
          <div>
            <h2> Hot Clips</h2>
            <GridView />
          </div>
        </div>
      </div>

      {/* NavBar - 제일 하단에 두기!*/}
      <NavBar
      current={"main"} />
    </div>
  );
}
