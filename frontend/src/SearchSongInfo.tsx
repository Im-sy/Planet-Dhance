import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CSSProperties } from '@mui/styled-engine';

interface SearchInfo {
  img: string;
  value: string;
  type: number;
  sx? : CSSProperties;
}

export default function SearchSongInfo(props: SearchInfo) {
  const { img, value, type, sx } = props;
  if (typeof sx === 'undefined') {
    let sx = { display: 'flex', flexDirection: 'column', width: '7rem' }
    return (
      <div style={{ margin: '0.5rem 1rem' }}>
        <Card sx={{ maxWidth: '100%', display: 'flex' }}>
          <CardMedia
            sx={sx}
            component="img"
            image="https://i.pinimg.com/736x/bb/25/56/bb255655d8846076ed5261a0ce2b7352--album-design-the-album.jpg"
            alt="album cover"
          />
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography gutterBottom variant="h5" component="div">
              Song
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Artist
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }else{
    return (
      <div style={{ margin: '0.5rem', height:'100px' }}>
        <Card sx={{ maxWidth: '100%', display: 'flex' }}>
          <CardMedia
            sx={sx}
            component="img"
            image="https://i.pinimg.com/736x/bb/25/56/bb255655d8846076ed5261a0ce2b7352--album-design-the-album.jpg"
            alt="album cover"
          />
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography gutterBottom variant="body1" component="div">
              {value}
              
            </Typography>
            <Typography variant="body2" color="text.secondary">
             { "More >>" } type : {type}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}
