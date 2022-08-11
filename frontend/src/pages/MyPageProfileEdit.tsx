import React from 'react'
import GridView from '../components/GridView'
import SearchSongInfo from '../components/SearchSongInfo'
import NavBar from '../components/NavBar'
import SubscribeTabs from '../components/SubscribeTabs';



export default function MyPage() {
  return (
    <div>

      <div>
        <SubscribeTabs />
      </div>
      <NavBar />
    </div>
  )
}