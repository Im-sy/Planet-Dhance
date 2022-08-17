import React, { CSSProperties } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { BrowserRouter, Route } from 'react-router-dom';
import Main from './Main';

import LogIn from './LogIn'
import SignUp from './SignUp';
import NotFound404 from './NotFound404';
// import SongPage from './MusicPage';
import SearchSong from './SearchSong';
import Subscribe from './Subscribe';
import {HashResult} from './HashResult';
import MyPage from './MyPage';
import ModeChallengeTimer from './Challenge';
import Ranking from './Ranking';
import { DanceCompare } from './DanceCompare';
import App2 from './EmojiPlayer';
import Upload from './UpLoad';
import ExplorePage from './ExplorePageList'
import ProfilePage from './ProfilePage';

import Teachable from './TeachableScript'
import Thumbnail from './Thumanil2'
import SongPage from './MusicPage';

import Scroll2 from './Scroll2'
import Random from './Random'








function AppRouter() {
  return (
 
    <BrowserRouter>
      <Routes >
        <Route path='/' element={<Main />} />
        {/* <Route path='/songpage' element={<SongPage />} /> */}
        <Route path='/subscribe' element={<Subscribe />} />
        <Route path='/searchsong/:searchType/:tagId' element={<SearchSong />} />
        <Route path='/hashresult' element={<HashResult />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/challenge' element={<ModeChallengeTimer />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/ranking' element={<Ranking />} />
        <Route path='/dancecompare' element={<DanceCompare />} />
        <Route path='/emoji' element={<App2 />} />
        <Route path='/profile/:tagId' element={<ProfilePage />} />

        <Route path='/teachable' element={<Teachable />} />

        <Route path='/songpage/:songId' element={<SongPage />} />

        <Route element={<NotFound404 />} />
        {/* test */}
        <Route path='/test' element={<Upload />} />
        <Route path='/random' element={<Random />} />
        <Route path='/:prevPage/playing/:videoId' element={<Scroll2 />} />
        <Route path='/subscribe/:prevPage/playing/:videoId' element={<Scroll2 />} />
        <Route path='/searchsong/:type/:musicId/:prevPage/playing/:videoId' element={<Scroll2 />} />
        <Route path='/songPage/:musicId/:prevPage/playing/:videoId' element={<Scroll2 />} />
        {/* <Route path='/:prevPage/playing/:videoId' element={<ExplorePage />} /> */}
      </Routes>
    </BrowserRouter>

  );
}

export default AppRouter;