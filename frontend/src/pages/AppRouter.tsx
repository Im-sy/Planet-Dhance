import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';
import SearchSong from './SearchSong';
import SearchTag from './SearchTag';
import Subscribe from './Subscribe';
import {HashResult} from './HashResult';
import MyPage from './MyPage';
// import ModeChallengeTimer from './Challenge';
import Ranking from './Ranking';
import { DanceCompare } from './DanceCompare';
import App2 from './EmojiPlayer';


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/songpage' element={<Songpage />} />
        <Route path='/' element={<Main />} />
        <Route path='/searchsong' element={<SearchSong />} />
        <Route path='/searchtag' element={<SearchTag />} />
        <Route path='/hashresult' element={<HashResult />} />
        <Route path='/mypage' element={<MyPage />} />
        {/* <Route path='/challenge' element={<ModeChallengeTimer />} /> */}
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/ranking' element={<Ranking />} />
        <Route path='/dancecompare' element={<DanceCompare />} />
        <Route path='/emoji' element={<App2 />} />
        <Route element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;