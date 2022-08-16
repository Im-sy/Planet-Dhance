import React , { CSSProperties, useState, useEffect } from 'react';
import { profile } from '../components/API/AuthService';
import { useSelector } from 'react-redux';
import { rootState } from '../reducer';
import NavBar from '../components/NavBar'
import MyPageProfile from '../components/MyPageProfile'
import MyPageAchievements from '../components/MyPageAchievements'
import MyPageClearSongs from '../components/MyPageClearSongs'
import SongPageGridView from '../components/MusicPageGridView'
import TopBar from '../components/TopBar';

interface userProps {
  nickname: string,
  imgUrl: string,
  nationFlag: string,
  introduce: string,
  followingCnt: number,
  followerCnt: number,
}
export interface clearListItem {
  title: string,
  imgUrl: string,
}
export interface contentItem {
  videoId: number,
  imgUrl: string,
}
export interface videoListProps {
  content: contentItem[],
  size: number,
  number: number,
  first: boolean,
  last: boolean,
  numberOfElements: number,
  empty: boolean
}
interface profileProps {
  user: userProps,
  clearList: clearListItem[],
  clearCnt: number,
  prevPage: string,
  videoList: videoListProps,
}

export default function MyPage() {
  const {isAuthenticated, user} = useSelector(
    (state: rootState) => state.authReducer
  );
  const getProfileInfo = async () => {
    const getprofile = await profile(user.userId)
    setProfileInfo(getprofile)
  }

  useEffect(() => {
    getProfileInfo();
  }, []);

  const [profileInfo, setProfileInfo] = useState<profileProps>()

  return (
    <div>
      <div>
        <TopBar />
      </div>

      <div>
        <MyPageProfile 
            toId={user.userId}
            img={profileInfo?.user?.imgUrl}
            nickname={profileInfo?.user?.nickname}
            introduction={profileInfo?.user?.introduce}
            nation={profileInfo?.user?.nationFlag}
            follower={profileInfo?.user?.followerCnt}
            following={profileInfo?.user?.followingCnt}
            isFollowed={false}
            type={1}
            // 프로필 부분 패딩과 마진 설정
            sx={{ display: 'flex', flexDirection: 'column', width: '5rem',  borderRadius: "50%", padding:" 0px 0.5rem", margin:"0.5rem 0.2rem" }}
          />
      </div>

      {/* 업적 */}
      {/* <div style={{ marginTop : 30, marginLeft : 10, marginBottom : 10, marginRight : 10 }}> */}
      <div style={{ marginTop : 10, marginLeft : 10, marginBottom : 10, marginRight : 10 }}>
        <h2 style={{ fontSize: '22px'}}>Achievments</h2>
        <MyPageAchievements clear={profileInfo?.clearCnt} />
        <hr />
      </div>

      {/* clear한 곡들  */}
      <div style={{  marginLeft : 10, marginBottom : 10, marginRight : 10,}}>
        <h2 style={{ fontSize: '22px'}}>Cleared Songs</h2>
        <MyPageClearSongs clearList={profileInfo?.clearList} />
      </div>

      {/* 내가 올린 영상 */}
      <div style={{  marginLeft : 10, marginBottom : 10, marginRight : 10,}}>
        <h2 style={{ fontSize: '22px'}}>My Videos</h2>
        <SongPageGridView videoList={profileInfo?.videoList?.content} prevPage={profileInfo?.prevPage} />
      </div>

      <NavBar current={"myPage"} />
    </div>
  )
}