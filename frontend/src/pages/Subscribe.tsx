import React from 'react'
import GridView from '../components/GridView'
import SearchSongInfo from '../components/SearchSongInfo'
import NavBar from '../components/NavBar'
import SubscribeTabs from '../components/SubscribeTabs';

import TopBar from '../components/TopBar';



export default function Subscribe() {
  return (
    <div>
      
      <div>
        <TopBar />
      </div>

      <div>
        <SubscribeTabs />
      </div>
      <NavBar current={"subscribe"}/>
    </div>
  )
}
