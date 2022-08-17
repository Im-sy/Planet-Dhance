import React , { CSSProperties, useState, useEffect } from 'react';
import { tagSearch } from '../components/API/MusicService';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar'
import MyPageProfile from '../components/MyPageProfile'
import MyPageAchievements from '../components/MyPageAchievements'
import MyPageClearSongs from '../components/MyPageClearSongs'
import SongPageGridView from '../components/MusicPageGridView'
import TopBar from '../components/TopBar';

interface userProps {
  id: number,
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
  empty: boolean,
}
interface profileProps {
  user: userProps,
  clearList: clearListItem[],
  clearCnt: number,
  prevPage: string,
  videoList: videoListProps
  follow: boolean,
}

export default function ProfilePage() {
  const {tagId} = useParams();
  const [fetching, setFetching] = useState(false); // 추가 데이터를 로드하는지 아닌지를 담기위한 state
  const [prevPage, setPrevPage] = useState<string>()
  const [videoList, setVideoList] = useState<contentItem[]>()
  const [pageNum, setPageNum] = useState<number>(0)
  const [lastPage, setLastPage] = useState<boolean>(false)
  const [profileInfo, setProfileInfo] = useState<profileProps>()
  
  const getProfileInfo = async () => {
    const getprofile = await tagSearch(parseInt(tagId), 'nickname', 0)
    setProfileInfo(getprofile)
    setPrevPage(getprofile.prevPage);
    setVideoList(getprofile.videoList?.content);
  }

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight + 21 >= scrollHeight && fetching === false) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      console.log('end')
      fetchMoreSearchInfo();
    }
  };
  
  const fetchMoreSearchInfo = async () => {
    // 추가 데이터를 로드하는 상태로 전환
    setFetching(true);
    console.log(lastPage)
    if (!lastPage) {
      const scrollsearch = await tagSearch(parseInt(tagId), 'nickname', pageNum+1)
      console.log(scrollsearch)
      setPageNum(pageNum + 1);
      setPrevPage(scrollsearch.prevPage);
      setVideoList(videoList.concat(...scrollsearch.videoList?.content))
      setLastPage(scrollsearch.videoList?.last)
    }

    // 추가 데이터 로드 끝
    setFetching(false)
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", handleScroll);
    };
  })

  return (
    <div>
      <div>
        <TopBar />
      </div>

      <div>
        <MyPageProfile 
            toId={profileInfo?.user?.id}
            img={profileInfo?.user?.imgUrl}
            nickname={profileInfo?.user?.nickname}
            introduction={profileInfo?.user?.introduce}
            nation={profileInfo?.user?.nationFlag}
            follower={profileInfo?.user?.followerCnt}
            following={profileInfo?.user?.followingCnt}
            isFollowed={profileInfo?.follow}
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

      <NavBar current={"search"} />
    </div>
  )
}