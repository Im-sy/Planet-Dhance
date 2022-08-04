import React, { CSSProperties, SetStateAction, useState } from 'react';
import Grid from '@mui/material/Grid';
import ActionAreaCard from './Card';

interface gridViewProps {
  urls : any
}

export default function SongPageGridView(props:gridViewProps) {
  const cardrendering = () => {
    const cardList = []
    for (let i=0; i<18; i++) {
      cardList.push(
        <Grid item sm={4}>
          <ActionAreaCard
            url={props.urls[i]}
            width="7.438rem"
            height="15rem" />
        </Grid>
      )
    }
    return cardList
  }

  return (
    <div>
      <Grid container spacing={0.4} style={{justifyContent: 'center'}}>
        {cardrendering()}
      </Grid>
    </div>
  )
}
