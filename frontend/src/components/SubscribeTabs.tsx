import React , { CSSProperties, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import SongPageGridView from './MusicPageGridView'
import SubscribeFollowGridView from './SubscribeFollowGridView'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ClassNames } from '@emotion/react';
import { styled } from "@mui/material/styles";
import {Link} from 'react-router-dom';
import { contentItem, videoListProps } from '../pages/MyPage';
import { favFollow, favLike } from '../components/API/ComService';
import { useSelector } from 'react-redux';
import { rootState } from '../reducer';

export interface followUserProps {
  id: number,
  tagId: number,
  nickname: string,
  introduce: string,
  imgUrl: string,
  nation: string,
  prevPage: string,
  videoList: contentItem[],
}
interface favFollowProps {
  content: followUserProps[],
  size: number,
  number: number,
  first: boolean,
  last: boolean,
  numberOfElements: number,
  empty: boolean,
}
interface favLikeProps {
  prevPage: string,
  videoList: videoListProps,
}

const StyledTabPanel= styled(TabPanel)(`
padding : 0
`);

export default function SubscribeTabs() {
  const {isAuthenticated, user} = useSelector(
    (state: rootState) => state.authReducer
  );

  const getFollowInfo = async () => {
    const getfollowinfo = await favFollow(user.userId, 0)
    setFavFollowInfo(getfollowinfo)
  }
  const getLikeInfo = async () => {
    const getlikeinfo = await favLike(user.userId, 0)
    setFavLikeInfo(getlikeinfo)
    setVideoList(getlikeinfo.videoList?.content)
  }

  useEffect(() => {
    getFollowInfo();
  }, []);
  
  useEffect(() => {
    getLikeInfo();
  }, [])
  
  const [favFollowInfo, setFavFollowInfo] = useState<favFollowProps>()
  const [favLikeInfo, setFavLikeInfo] = useState<favLikeProps>()

  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [fetching, setFetching] = useState(false); // 추가 데이터를 로드하는지 아닌지를 담기위한 state
  const [pageNum, setPageNum] = useState<number>(0)
  const [lastPage, setLastPage] = useState<boolean>(false)
  const [videoList, setVideoList] = useState<contentItem[]>()

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    // console.log(scrollTop, clientHeight, scrollHeight)
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
      const getlikeinfo = await favLike(user.userId, pageNum+1)
      setPageNum(pageNum+1)
      setVideoList(videoList.concat(...getlikeinfo.videoList?.content))
      setLastPage(getlikeinfo.videoList?.last)
    }

    // 추가 데이터 로드 끝
    setFetching(false)
  };

  useEffect( () => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", handleScroll);
    };
  })

  const useStyles = makeStyles(() => ({
    tab: { 
        '& .MuiBox-root': {
          padding: '0px',
          },
        },
    }));

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value} >
        <Box sx={{ color : '#FFFFFF'}}  >
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered 
            TabIndicatorProps={{style: {display:'none', color:'#FFFFFF'}}} 
            textColor="inherit"  >
            <Tab label="Follow" value="1" />
            <Tab label="Likes" value="2" />
          </TabList>
        </Box>
  

        <StyledTabPanel value="1" >
          <SubscribeFollowGridView profiles={favFollowInfo?.content}/>
        </StyledTabPanel>

        <StyledTabPanel value="2">
          <SongPageGridView prevPage={favLikeInfo?.prevPage} videoList={videoList} />
        </StyledTabPanel>
      </TabContext>
    </Box>
  );
}










