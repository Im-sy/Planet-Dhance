import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
interface cardProps {
  url: string,
  width: string,
  height: string,
  type: string,
  id: number
}



export default function ActionAreaCard(props: cardProps) {
  const navigate = useNavigate();
  const { type, id } = props;
  const toSearch = () =>{
    if (type === 'ARTIST'){
      navigate(`/searchsong/ARTIST/${id}`);
    }else{
      navigate(`/searchsong/TITTLE/${id}`);
    }

  }

  const { url, width, height } = props
  return (
    <div onClick={toSearch}>
      <Card sx={{ maxWidth: width }}>
        <CardActionArea >
          <CardMedia
            style={{
              width: width,
              height: height,
            }}
            component="img"
            image={url}
            alt="sea"
          />
        </CardActionArea>
      </Card>
    </div>
    
  );
}
