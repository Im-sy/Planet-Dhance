import React from 'react'
import GridView from './GridView'
import SearchSongInfo from './SearchSongInfo'

export default function SearchSong() {
  return (
    <div>
      <div className="search-bar">
        <h3>검색창 자리</h3>
      </div>
      <div>
        <SearchSongInfo />
        <SearchSongInfo />
        <SearchSongInfo />
      </div>
      <br />
      <div>
        <GridView />
      </div>
    </div>
  )
}
