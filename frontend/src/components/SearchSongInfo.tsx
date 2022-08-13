import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CSSProperties } from '@mui/styled-engine';

interface SearchInfo {
  id: number;
  img: string;
  value: string;
  type: string;
  sx? : CSSProperties;
}

export default function SearchSongInfo(props: SearchInfo) {
  const { id, img, value, type, sx } = props;
  
  const navigate = useNavigate();

  const toGo = () => {
    console.log(props);    
    navigate(`/searchsong/${type}/${id}`);
  }

  const goToSongPage = () =>{
    navigate(`/songPage/${id}`);
  }


  if (typeof sx === 'undefined') {
    let sx = { display: 'flex', flexDirection: 'column', width: '7rem' }
    return (
      <div style={{ margin: '0.5rem 1rem' }}>
        <Card onClick={goToSongPage} sx={{ maxWidth: '100%', display: 'flex' }}>
          <CardMedia
            sx={sx}
            component="img"
            image={img}
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
        <Card onClick={toGo} sx={{ maxWidth: '100%', display: 'flex' }}>
          <CardMedia
            sx={sx}
            component="img"
            image={`https://i7d201.p.ssafy.io/${img}`}
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
