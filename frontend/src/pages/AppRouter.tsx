import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';
import SearchSong from './SearchSong';
import Songpage from './songPage';
import LogIn from './LogIn'
import SignUp from './SignUp';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/songpage' element={<Songpage />} />
        <Route path='/' element={<Main />} />
        <Route path='/searchsong' element={<SearchSong />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        {/* <Route element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;