import React, { useState, useRef, useEffect } from 'react';
import ReactPageScroller from 'react-page-scroller';
import VideoPage from './ExplorePage';
import url from '../videos/Patissiere_guide.mp4';
import { videoListProps } from './MyPage';
import { playVideo } from '../components/API/MusicService';
import { useSelector } from 'react-redux';
import { rootState } from '../reducer';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export interface tagItemProps {
  id: number,
  type: string,
  className: string
}
export interface videoItemProps {
  videoId: number,
  musicId: number,
  hit: number,
  videoUrl: string,
  like: boolean,
  likeCnt: number,
  tagList: tagItemProps[],
}
interface playListProps {
  videoList: videoItemProps[],
  number: number,
  first: boolean,
  last: boolean,
  numberOfElements: number,
  empty: boolean,
}

export default function ExplorePageList() {
  const location = useLocation();
  const state = location.state as {prevPage: string; videoId: number;}
  const prevPage = state.prevPage
  const videoId = state.videoId

  const {isAuthenticated, user} = useSelector(
    (state: rootState) => state.authReducer
  );

  useEffect(() =>{
    const getPlayList = async () => {
      const getplaylist = await playVideo(videoId, prevPage, user.userId)
      setPlayListInfo(getplaylist)
    }
    getPlayList()
  },[])
  const [playListInfo, setPlayListInfo] = useState<playListProps>()

  const [currentPage, setCurrentPage] = useState(null);
  const [data, setData] = useState<videoItemProps[]>(playListInfo.videoList);
  const pageOnChange = (number: number) => {
    setCurrentPage(number);
    // console.log(number);
  };

  let array = [0, 1, 2];
  const beforePageChange = (number: number) => {
    console.log(number);
    if(number === data.length-1){
      console.log('last4');
      // axios 통신 추가 필요 (무한스크롤)
      setData([...data, ])
    }
  };
  return (
    <ReactPageScroller
      pageOnChange={pageOnChange}
      onBeforePageScroll={beforePageChange}
    >
      {/* for 문으로 key index 값을 가지며, index == current일경우 플레이 */}

      {[...data].map((x, i) =>
        <section className="full-page">
          <VideoPage playing={!!(currentPage == i)} muted={true} videoItem={x} />
        </section>
      )}

    </ReactPageScroller>
  );
}
