import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { tagSearch } from '../components/API/MusicService';
import GridView from '../components/GridView'
import SearchSongInfo from '../components/SearchSongInfo'
import NavBar from '../components/NavBar'
import SearchBar from '../components/SearchBar'
import TopBar from '../components/TopBar'
import {videoListProps, contentItem} from './MyPage'
interface musicListItem {
  id: number,
  title: string,
  artist: string,
  imgUrl: string,
}

interface tagSearchSong {
  musicList: musicListItem[],
  prevPage: string,
  videoList: videoListProps,
}
interface tagSearchGrid {
  prevPage: string,
  videoList: videoListProps,
}

export default function SearchSong() {
  const {searchType, tagId} = useParams();
  const [fetching, setFetching] = useState(false); // 추가 데이터를 로드하는지 아닌지를 담기위한 state
  const [musicList, setMusicList] = useState<musicListItem[]>()
  const [prevPage, setPrevPage] = useState<string>()
  const [videoList, setVideoList] = useState<contentItem[]>()
  const [pageNum, setPageNum] = useState<number>(0)
  const [lastPage, setLastPage] = useState<boolean>(false)

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight + 1 >= scrollHeight && fetching === false) {
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
      const scrollsearch = await tagSearch(parseInt(tagId), searchType.toLowerCase(), pageNum+1)
      setPageNum(pageNum+1)
      setPrevPage(scrollsearch.prevPage)
      setVideoList(videoList?.concat(...scrollsearch.videoList?.content))
      setLastPage(scrollsearch.videoList?.last)
    }

    // 추가 데이터 로드 끝
    setFetching(false)
  };

  useEffect( () => {
    const getSearchInfo = async () => {
      const getsearch = await tagSearch(parseInt(tagId), searchType.toLowerCase(), pageNum);
      console.log(getsearch)
      if (searchType==="ARTIST" || searchType==="TITLE") {
        setMusicList(getsearch.musicList)
      }
      setPrevPage(getsearch.prevPage)
      setVideoList(getsearch.videoList?.content)
      setLastPage(getsearch.videoList?.last)
    }
    getSearchInfo();
  }, []); 

  useEffect( () => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", handleScroll);
    };
  })


  return (
    <div>
      <TopBar />
      <div className="search-bar">
        <SearchBar />
      </div>
      <div>
        {musicList?.map((musicItem: musicListItem) => (
          <SearchSongInfo key={musicItem.id}
            id={musicItem.id}
            imgUrl={musicItem.imgUrl}
            title={musicItem.title}
            artist={musicItem.artist}
          />
        ))}
      </div>
      <br />
      <div>
        <GridView prevPage={prevPage} videoList={videoList} />
      </div>
      <NavBar current={"search"} />
    </div>
  )
}
