import React from 'react'
import { useLocation } from 'react-router-dom';
import { rankingItem } from './Main'
import RankScore from '../components/RankScore';
import Planet from '../components/Planet';
import NavBar from '../components/NavBar';
import TopBar from '../components/TopBar';

export default function Ranking() {
  const location = useLocation();
  const state = location.state as {scores: rankingItem[]}
  const scores = state?.scores

  return (
    <div>
      <TopBar />
      <RankScore scores={scores} />
      <Planet />
      <NavBar current={"main"} />
    </div>
  )
}
