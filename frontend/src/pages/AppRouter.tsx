import React, { CSSProperties } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';

import LogIn from './LogIn'
import SignUp from './SignUp';
import NotFound404 from './NotFound404';
// import SongPage from './MusicPage';
import SearchSong from './SearchSong';
import SearchTag from './SearchTag';
import Subscribe from './Subscribe';
import {HashResult} from './HashResult';
import MyPage from './MyPage';
import ModeChallengeTimer from './Challenge';
import Ranking from './Ranking';
import { DanceCompare } from './DanceCompare';
import App2 from './EmojiPlayer';
import HashTagTextArea from '../components/HashTagTextArea';
import ExplorePage from './ExplorePageList'
import SongPage from './MusicPage';







function AppRouter() {
  return (
 
    <BrowserRouter>
      <Routes >
        <Route path='/' element={<Main />} />
        {/* <Route path='/songpage' element={<SongPage />} /> */}
        <Route path='/subscribe' element={<Subscribe />} />
        <Route path='/searchsong' element={<SearchSong />} />
        <Route path='/searchtag' element={<SearchTag />} />
        <Route path='/hashresult' element={<HashResult />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/challenge' element={<ModeChallengeTimer />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/ranking' element={<Ranking />} />
        <Route path='/dancecompare' element={<DanceCompare />} />
        <Route path='/emoji' element={<App2 />} />
        <Route path='/songpage/:songId' element={<SongPage />} />
        <Route element={<NotFound404 />} />
        {/* test */}
        <Route path='/test' element={<HashTagTextArea />} />
        <Route path='/playing' element={<ExplorePage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default AppRouter;