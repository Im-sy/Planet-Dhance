import React, { useState, useRef, useEffect } from 'react';
import ReactPageScroller from 'react-page-scroller';
import VideoPage from './ExplorePage';

import url from '../videos/pop_guide.mp4';

import url from '../videos/Patissiere_guide.mp4';


export default function ExplorePageList() {
  const [currentPage, setCurrentPage] = useState(null);
  const [data, setData] = useState([0, 1, 2, 3]);
  const pageOnChange = (number) => {
    setCurrentPage(number);
    // console.log(number);
  };

  let array = [0, 1, 2];
  const beforePageChange = (number) => {
    console.log(number);
    if(number === data.length-1){
      console.log('last4');
      setData([...data, 4, 5, 6])
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
      <VideoPage url={url} playing={!!(currentPage == i)} muted={true} />
    </section>
      )}

    </ReactPageScroller>
  );
}
