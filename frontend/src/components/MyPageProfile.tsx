import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CSSProperties } from '@mui/styled-engine';
import { styled } from "@mui/material/styles";

interface MyPageProfileProps {
  img: string;
  nickname: string;
  introduction : string;
  nation : string;
  follower : number;
  following : number;
  type: number;
  sx? : CSSProperties;
}

const StyledCardContent= styled(CardContent)(`
padding : 0
`);
export default function MyPageProfile(props: MyPageProfileProps) {

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

  const { img, nickname, introduction, nation, follower, following, type, sx } = props;
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
      <div style={{ margin: '0.5rem 0.5rem 0rem 0.5rem', height:'100px' }}>
        <Card sx={{ maxWidth: '100%', display: 'flex' }}>
          <CardMedia
            sx={sx} 
            component="img"
            image={img}
            alt="profile img"
          />

          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography gutterBottom variant="body1" component="div"  >
              {nickname}  {nation}
              
            </Typography>
            <Typography variant="body2" component="div" color="text.secondary" sx={introductionStyle}>
             { introduction } 
            </Typography>

            <Typography variant="body2" component="div" sx={followStyle}>
             Follower  <b>{ follower }</b> &nbsp;&nbsp; Following <b>{ following }</b> 
            </Typography>

          </CardContent>
        </Card>
      </div>
    );
  }
}
