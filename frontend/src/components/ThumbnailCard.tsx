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
  id: number,
  curSlide : number,
}



export default function ThumbnailCard(props: cardProps) {
  const { type, id } = props;
  

  const { url, width, height, curSlide } = props
  return (
    <div>
      <Card sx={{ maxWidth: width }}>
        <CardActionArea >
          {
            curSlide === id ? <CardMedia
            style={{
              width: width,
              height: height,
            }}
            // src={`${url}`}
            component="img"
            image={url}
            alt="thumbnail"
          /> : <CardMedia
          style={{
            width: width,
            height: height,
            opacity: "0.4",
          }}
          // src={`${url}`}
          component="img"
          image={url}
          alt="thumbnail"
        />
          }
        </CardActionArea>
      </Card>
    </div>
    
  );
}
