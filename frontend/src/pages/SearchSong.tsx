import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { tagSearch } from '../components/API/MusicService';
import GridView from '../components/GridView'
import SearchSongInfo from '../components/SearchSongInfo'
import NavBar from '../components/NavBar'
import SearchBar from '../components/SearchBar'
import TopBar from '../components/TopBar'
import {videoListProps} from './MyPage'
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
  useEffect( () => {
    const getSearchInfo = async () => {
      const getsearch = await tagSearch(parseInt(tagId), searchType)
      console.log(getsearch)
      if (searchType==="artist" || searchType==="music") {
        setMusicList(getsearch.musicList)
      }
      setPrevPage(getsearch.prevPage)
      setVideoList(getsearch.videoList)
    }
    getSearchInfo();
  }, []); 

  const [musicList, setMusicList] = useState<musicListItem[]>()
  const [prevPage, setPrevPage] = useState<string>()
  const [videoList, setVideoList] = useState<videoListProps>()

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
        <GridView prevPage={'prevPage'} videoList={undefined}  />
      </div>
      <NavBar current={"main"} />
    </div>
  )
}
