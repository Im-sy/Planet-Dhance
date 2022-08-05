import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App2 from './pages/App_video';
import ActionAreaCard from './components/Card';
import GridView from './components/GridView';
import SearchTag from './pages/SearchTag';
import SearchSong from './pages/SearchSong';
import { HashResult } from './pages/HashResult';
import Carousel from './components/Carousel';
import { DanceCompare } from './pages/DanceCompare';

import ModelViewer from './components/Planet';
import SearchSongInfo from './components/SearchSongInfo';
// import RankScoreCard from './RankScoreCard';
import ModeChallengeTimer from './pages/modeChallengeTimer';
import Main from './pages/Main';

// import ModelViewer from './3dearth/ModelViewer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Main />
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
