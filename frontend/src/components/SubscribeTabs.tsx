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
  }

  useEffect(() => {
    getFollowInfo();
    getLikeInfo();
  }, []);
  
  const [favFollowInfo, setFavFollowInfo] = useState<favFollowProps>()
  const [favLikeInfo, setFavLikeInfo] = useState<favLikeProps>()

  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
          <SubscribeFollowGridView profiles={favFollowInfo.content}/>     
        </StyledTabPanel>

        <StyledTabPanel value="2">
          <SongPageGridView prevPage={favLikeInfo.prevPage} videoList={favLikeInfo.videoList}/>
        </StyledTabPanel>
      </TabContext>
    </Box>
  );
}










