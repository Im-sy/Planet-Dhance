import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';

import LogIn from './LogIn'
import SignUp from './SignUp';
import NotFound from './SearchSong';
import Songpage from './SongPage';
import SearchSong from './SearchSong';
import Subscribe from './Subscribe';
import {HashResult} from './HashResult';
import MyPage from './MyPage';
import ModeChallengeTimer from './ModeChallengeTimer';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/songpage' element={<Songpage />} />
        <Route path='/subscribe' element={<Subscribe />} />
        <Route path='/searchsong' element={<SearchSong />} />
        <Route path='/hashresult' element={<HashResult />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/challenge' element={<ModeChallengeTimer />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;