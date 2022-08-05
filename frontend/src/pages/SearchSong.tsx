import React from 'react'
import GridView from '../components/GridView'
import SearchSongInfo from '../components/SearchSongInfo'
import NavBar from '../components/NavBar'

export default function SearchSong() {
  return (
    <div>
      <div className="search-bar">
        <h3>검색창 자리</h3>
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
