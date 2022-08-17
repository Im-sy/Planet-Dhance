import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CSSProperties } from '@mui/styled-engine';
import { styled } from "@mui/material/styles";
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { deepOrange, green } from '@mui/material/colors';
import BtnFollow from '../components/UI/btnFollow';
import { useSelector } from 'react-redux';
import { rootState } from '../reducer';

interface MyPageProfileProps {
  toId: number;
  img: string;
  nickname: string;
  introduction : string;
  nation : string;
  follower : number;
  following : number;
  type: number;
  isFollowed: boolean;
  sx? : CSSProperties;
}

const StyledCardContent= styled(CardContent)(`
padding : 0
`);
export default function MyPageProfile(props: MyPageProfileProps) {
  const {isAuthenticated, user} = useSelector(
    (state: rootState) => state.authReducer
  );

  const introductionStyle: CSSProperties = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace : 'nowrap',
    width: '60vw',
    height: '2.5vh',
    margin: '0 0 0 0'
  };

  const followStyle: CSSProperties = {
    // margin : '2px'
  };

  const { toId, img, nickname, introduction, nation, follower, following, isFollowed, type, sx } = props;
  if (typeof sx === 'undefined') {
    let sx = { display: 'flex', flexDirection: 'column', width: '7rem' }
    return (
      <div style={{ margin: '0.5rem 1rem' }}>
        <Card sx={{ maxWidth: '100%', display: 'flex' }}>
          <CardMedia
            sx={sx}
            component="img"
            image={img}
            alt="profile img"
          />
          <StyledCardContent id='dfd' sx={{ flex: '1 0 auto' }}>
            <Typography gutterBottom variant="h5" component="div">
              Nickname  nation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Introduction
            </Typography>
          </StyledCardContent>
        </Card>
      </div>
    );
  }else{
    return (
      <div style={{ margin: '0.5rem 0.5rem 0rem 0.5rem'}}>
        {/* <Card sx={{ maxWidth: '100%', display: 'flex' }}>
          <CardMedia
            sx={sx} 
            component="img"
            image={img}
            alt="profile img"
          />

          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography gutterBottom variant="body1" component="div"  >
              {nickname}  {nation} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <EditIcon />
              
            </Typography>
            <Typography variant="body2" component="div" color="text.secondary" sx={introductionStyle}>
             { introduction } 
            </Typography>

            <Typography variant="body2" component="div" sx={followStyle}>
             Follower  <b>{ follower }</b> &nbsp;&nbsp; Following <b>{ following }</b> 
            </Typography>

          </CardContent>
        </Card> */}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 20px 20px 0px", textAlign: "center" }}>
            <div id="profile_img" style={{ display : "inline-block" }}>
              <Avatar alt={nickname} src={img}   sx={{ width: "100px", height: "100px" }} />

            </div>
            {/* follower */}
            <div id="follow"  style={{ display : "flex"}} >
              <div id="follow"  style={{ display : "flex" , flexDirection : "column", alignItems: "center", maxWidth : "45%", fontSize: '17px'}} >
                {/* <div>
                <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                  {follower} 
                </Avatar>
                </div>

                <div>
                <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                  {following} 
                </Avatar>
                </div> */}
                <p>Follower</p>
                <p><b>{ follower }</b></p>   
              </div>
            </div>
            <div id="follow"  style={{ display : "flex" , maxWidth : "70%" , }} >
            {/* following */}
              <div id="follow"  style={{ display : "flex" , flexDirection : "column", alignItems: "center", maxWidth : "45%", fontSize: '17px' }} >
                <p>Following</p>
                <p><b>{ following } </b> </p>
              </div>
            </div>
          </div>


          {/* 자기소개 */}
          <div>
            <h2 style={{overflow: 'hidden',  textOverflow: 'ellipsis', whiteSpace : 'nowrap', width: '60vw',  height: '2.5vh', fontSize:'20px', margin: '5px 0px'}}>
              <b> {nickname} </b> {nation}
            </h2>
              
            <p style={{  overflow: 'hidden',  textOverflow: 'ellipsis', whiteSpace : 'nowrap', width: '60vw',  height: '2.5vh', margin: '5px 0px'}}> 
              {introduction}
            </p>
          </div>


          {/* 프로필 편집 or follow */}
          {/* <div>
            <Button variant="contained" color="success" sx={{ mt : 1, width : "100%"}}> Profile Edit </Button>
          </div> */}


      </div>
    );
  }
}