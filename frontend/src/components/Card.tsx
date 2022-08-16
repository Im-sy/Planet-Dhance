import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import {Link} from 'react-router-dom';
interface cardProps {
  url: string,
  width: string,
  height: string,
  prevPage: string,
  videoId: number,
}

export default function ActionAreaCard(props: cardProps) {
  const navigate = useNavigate();

  const {url, width, height, prevPage, videoId} = props

  const handleCardClick = () => {
    // navigate(`${prevPage}/playing/${videoId}`, {state:{prevPage: prevPage, videoId: videoId,}})
    navigate(`/playing`, {state:{prevPage: prevPage, videoId: videoId,}})
  }

  return (
    <div>
      <Card sx={{ maxWidth: width}} onClick={handleCardClick}>
        <CardActionArea >
          <CardMedia
            style={{
              width: width,
              height: height,
            }}
            component="img"
            image={"https://i7d201.p.ssafy.io/"+url}
            alt="sea"
          />
        </CardActionArea>
      </Card>
    </div>
    
  );
}
