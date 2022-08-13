import * as React from 'react';
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
  const {url, width, height, prevPage, videoId} = props
  return (
    <div>
      <Card sx={{ maxWidth: width}} component={Link} to='/playing'>
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
