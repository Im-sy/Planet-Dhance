import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';
import SearchSong from './SearchSong';
import Songpage from './songPage';
import Thumnail from './Thumnail';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/songpage' element={<Songpage />} />
        <Route path='/' element={<Thumnail />} />
        <Route path='/searchsong' element={<SearchSong />} />
        {/* <Route element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;