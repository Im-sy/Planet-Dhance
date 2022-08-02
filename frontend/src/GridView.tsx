import React from 'react'
import Grid from '@mui/material/Grid';
import ActionAreaCard from './Card';

export default function GridView() {
  const cardrendering = () => {
    const cardList = []
    for (let i=0; i<30; i++) {
      cardList.push(
        <Grid item sm={4}>
          <ActionAreaCard
            url="https://cdn.pixabay.com/photo/2019/06/20/09/26/underwater-4286600_960_720.jpg"
            width="8.438rem"
            height="15rem" />
        </Grid>
      )
    }
    return cardList
  }

  return (
    <div>
      <Grid container spacing={0} style={{justifyContent: 'center'}}>
        {cardrendering()}
      </Grid>
    </div>
  )
}
