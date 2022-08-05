import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CSSProperties } from '@mui/styled-engine';

interface SearchInfo {
  img: string;
  nickname: string;
  introduction : string;
  type: number;
  sx? : CSSProperties;
}

export default function SubscribeProfile(props: SearchInfo) {
  const { img, nickname, introduction, type, sx } = props;
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
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography gutterBottom variant="h5" component="div">
              Nickname
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Introduction
            </Typography>
          </CardContent>
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
            <Typography gutterBottom variant="body1" component="div">
              {nickname}
              
            </Typography>
            <Typography variant="body2" color="text.secondary">
             { introduction }
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}
