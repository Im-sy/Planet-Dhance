import React from 'react'
import RankScore from '../components/RankScore';
import Planet from '../components/Planet';
import NavBar from '../components/NavBar';
import TopBar from '../components/TopBar';

export default function Ranking() {
  return (
    <div>
      <TopBar />
      <RankScore />
      <Planet />
      <NavBar />
    </div>
  )
}
