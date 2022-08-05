import React from 'react'
import GridView from '../components/GridView'
import SearchSongInfo from '../components/SearchSongInfo'
import NavBar from '../components/NavBar'
import SearchBar from '../components/SearchBar'
import TopBar from '../components/TopBar'

export default function SearchSong() {
  return (
    <div>
      <TopBar />
      <div className="search-bar">
        <SearchBar />
      </div>
      <div>
        <SearchSongInfo
          img={"여기에 이미지 url 혹은 blob"}
          value={"여기엔 검색 결과 값"}
          type = {0}
        />
        {/* <SearchSongInfo />
        <SearchSongInfo /> */}
      </div>
      <br />
      <div>
        <GridView />
      </div>
      <NavBar />
    </div>
  )
}
