import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import SubscribeProfile from './SubscribeProfile';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { contentItem } from '../pages/MyPage';

interface cardProps {
  tagId: number,
  profileImg: string,
  nickname: string,
  introduction: string,
  videoList : contentItem[],
  nation: string,
  width : string,
  height : string,
}

export default function SubscribeFollowCard(props: cardProps) {
  // 프로필사진, 닉네임, 한줄 소개, 영상5 urls
  const {tagId, profileImg, nickname, introduction, videoList, nation, width, height} = props
  return (
    <div>
      <Card sx={{ maxWidth: "100vw" }}>
        <CardContent sx={{  padding:0 }}>
          <SubscribeProfile
              img={profileImg}
              nickname={nickname}
              introduction={introduction}
              nation={nation}
              type={1}
              // 프로필 부분 패딩과 마진 설정
              sx={{ display: 'flex', flexDirection: 'column', width: '5rem',  borderRadius: "50%", padding:" 0px 0.5rem", margin:"0.5rem 0.2rem" }}
            />
        </CardContent>
        
        <Grid container spacing={0} direction='row' sx={{ p:1 }}>
          {videoList.map((videoItem: contentItem) => (
            <CardActionArea key={videoItem.videoId} sx={{ p:1 , maxWidth : "16.5vw" }} component={Link} to={`/profile/${tagId}`} > 
              <Grid item sm={4} >
                <CardMedia
                  style={{
                    width: width,
                    height: height,
                  }}
                  component="img"
                  image={"https://i7d201.p.ssafy.io/"+videoItem.imgUrl}
                  alt="user upload video"
                />
              </Grid>
            </CardActionArea>  
          ))}
          <Link to='/'>
            <MoreHorizIcon sx={{  top : {height} }} > </MoreHorizIcon>
          </Link>
        </Grid>
      </Card>
    </div>
  );
}
