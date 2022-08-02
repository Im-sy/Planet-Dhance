import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

interface cardProps {
  url: string,
  width: string,
  height: string,
}

export default function ActionAreaCard(props: cardProps) {
  const {url, width, height} = props
  return (
    <div>
      <Card sx={{ maxWidth: width}}>
        <CardActionArea>
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
