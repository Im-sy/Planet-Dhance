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
interface tagMusicInfo {
  id: number,
  title: string,
  artist: string,
  imgUrl: string,
}
function isSearchInfo(arg:any): arg is SearchInfo {
  return arg.value !== undefined;
}

export default function SearchSongInfo(props: SearchInfo | tagMusicInfo) {
  const navigate = useNavigate();

  if (isSearchInfo(props)) {
    console.log('SearchInfo')
    const { id, img, value, type, sx } = props;
    const toGo = () => {
      if (type === "NICKNAME") {
        navigate(`/profile/${id}`);
      } else {
        console.log(props);    
        navigate(`/searchsong/${type}/${id}`);        
      }
    }
    return (
      <div style={{ margin: '0.5rem', height:'100px' }}>
        <Card onClick={toGo} sx={{ maxWidth: '100%', display: 'flex' }}>
          <CardMedia
            sx={sx}
            component="img"
            image={`https://i7d201.p.ssafy.io/${img}`}
          />
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography gutterBottom variant="body1" component="div" sx={{ color: 'white', fontFamily: 'san-serif', fontSize: '20px', }}>
              {value}
              
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{display: 'flex', justifyContent: 'space-between',}} sx={{ color: '#C7C7C7', fontFamily: 'san-serif',}}>
              <p style={{margin: '0px',}}>{type}</p>
              <p style={{ fontSize: '0.8rem', paddingTop: '5px', lineHeight: '1rem',}}>{ "More Video >>" } </p>
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    const { id, title, artist, imgUrl } = props;
    const goToSongPage = () =>{
      navigate(`/songPage/${id}`);
    }
    let sx = { display: 'flex', flexDirection: 'column', width: '7rem' }
    return (
      <div style={{ margin: '2rem 1rem 0.5rem' }}>
        <Card onClick={goToSongPage} sx={{ maxWidth: '100%', display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.87)' }}>
          <CardMedia
            sx={sx}
            component="img"
            image={`https://i7d201.p.ssafy.io/${imgUrl}`}
            alt="album cover"
          />
          <CardContent sx={{ flex: '1 0 auto', alignItems: 'center'}} >
            <Typography gutterBottom variant="h6" component="div" color="white" style={{margin: '0.5rem 0rem 0.3rem'}} >
              {title}
              
            </Typography>
            <Typography variant="body2" color="rgba(188, 188, 188, 1)" style={{display: 'flex', justifyContent: 'space-between', margin: '0rem 0rem 0rem'}} >
              <p>{artist}</p>
              <p> { "Join >>" } </p>
            </Typography>

          </CardContent>
        </Card>
      </div>
    );
  }
}

