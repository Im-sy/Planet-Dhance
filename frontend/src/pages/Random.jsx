import React, { useState, useRef, useEffect } from 'react';
import ReactPageScroller from 'react-page-scroller';
import VideoPage from './ExplorePage';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { randomPlayVideo } from '../components/API/MusicService';
import NavBar from '../components/NavBar'
import TopBar from '../components/TopBar'

export default function ExplorePageList() {
  const [currentPage, setCurrentPage] = useState(null);
  const { prevPage, videoId } = useParams();
  const [playListInfo, setPlayListInfo] = useState();
  const { isAuthenticated, user } = useSelector(
    (state) => state.authReducer
  );
  const navigate = useNavigate();
  const [data, setData] = useState([0, 1, 2, 3]);
  // if (!isAuthenticated){
  //   (()=> navigate('/login'))
  // }
  useEffect(() => {
    if (!isAuthenticated){
      navigate('/login')
    }
    const getPlayList = async () => {
      const getplaylist = await randomPlayVideo(
        user.userId
      ).then((results) => {
        setData(results);
        // setPlayListInfo(results);
      });
    };
    getPlayList();
    console.log('getdata');
  }, []);

  const pageOnChange = (number) => {
    setCurrentPage(number);
    // console.log(number);
  };

  const beforePageChange = (number) => {
    console.log(number);
    if(number === data.length-1){
      console.log('last4');
      // setData([...data, 4, 5, 6])
    }
  };
  console.log(data);
  return (
    <div>
      <TopBar />
    <ReactPageScroller
      pageOnChange={pageOnChange}
      onBeforePageScroll={beforePageChange}
    >
      {/* for 문으로 key index 값을 가지며, index == current일경우 플레이 */}

      {[...data].map((x, i) =>
      <section className="full-page">
      <VideoPage playing={!!(currentPage == i)} muted={true} videoItem={x}/>
    </section>
      )}

    </ReactPageScroller>
    <NavBar current={"random"} />
    </ div>
  );
}
