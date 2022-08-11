import React from 'react'
import Grid from '@mui/material/Grid';
import ActionAreaCard from './Card';

interface cardItem {
  video_id: number;
  video_url: string; //Blob?
  scope: string;
  img_url: string;
  hit: number;
  reg_date: Date; //string?
  user_id: number;
  music_id: number;
  order_weight: number;
}

interface cardListProps {
  cardList: cardItem[];
}

export default function GridView() {
  const cardrendering = () => {
    const cardList = []
    for (let i=0; i<18; i++) {
      cardList.push(
        <Grid item sm={4}>
          <ActionAreaCard
            url="https://cdn.pixabay.com/photo/2019/06/20/09/26/underwater-4286600_960_720.jpg"
            width="28.2vw"
            height="30vh" />
        </Grid>
      )
    }
    return cardList
  }

  return (
    <div>
      <Grid container spacing={0.4} style={{justifyContent: 'center'}}>
        {cardrendering()}
        {/* {cardList.map((card: cardItem) => (
          <Grid item sm={4} key={card.video_id}>
            <ActionAreaCard
              url={card.img_url}
              width="28.2vw"
              height="30vh" />
          </Grid>
        ))} */}
      </Grid>
    </div>
  )
}
