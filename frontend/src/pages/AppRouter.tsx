import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';
import NotFound from './SearchSong';
import Songpage from './SongPage';
import SearchSong from './SearchSong';
import Subscribe from './Subscribe';
import HashResult from './HashResult';
import ModeChallengeTimer from './modeChallengeTimer';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/songpage' element={<Songpage />} />
        <Route path='/subscribe' element={<Subscribe />} />
        <Route path='/searchsong' element={<SearchSong />} />
        <Route path='/hashresult' element={<HashResult />} />
        <Route path='/challenge' element={<ModeChallengeTimer />} />
        <Route element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;