import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function ActionAreaCard() {
  const cardrendering = () => {
    const res = []
    for (let i=0; i<12; i++) {
      res.push(
        <Grid item sm={4}>
          <Card sx={{ maxWidth: '8.438rem'}}>
            <CardActionArea>
              <CardMedia
                style={{
                  width: '8.438rem',
                  height: '15rem',
                }}
                component="img"
                // height="300"
                image="https://cdn.pixabay.com/photo/2019/06/20/09/26/underwater-4286600_960_720.jpg"
                alt="sea"
              />
            </CardActionArea>
          </Card>
        </Grid>
      )
    }
    return res
  }
  return (
    <div>
      <Grid container spacing={0}>
        {cardrendering()}
      </Grid>
    </div>
    
  );
}
