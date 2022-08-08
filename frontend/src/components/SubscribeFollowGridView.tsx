import React, { CSSProperties, SetStateAction, useState } from 'react';
import Grid from '@mui/material/Grid';
import SubscribeFollowCard from './SubscribeFollowCard';

interface SubscribeFollowGridViewProps {
  urls : any,
  profiles : any,

}

export default function SubscribeFollowGridView(props:SubscribeFollowGridViewProps) {
  // 1. 해당 유저가 FOLLOW한 유저들과, 그 유저들의 NICKNAME, INTRODUCTION, 최근 영상 5개 가져와야 함
  

  const cardrendering = () => {
    const cardList = []
    for (let i=0; i<2; i++) {
      cardList.push(
        <Grid item sm={4}>
          <SubscribeFollowCard
            profileImg={props.profiles[i][0]}
            nickname={props.profiles[i][1]}
            introduction={props.profiles[i][2]}
            urls={props.urls[i]}
            width="16vw"
            height="12vh" />
        </Grid>
      )
    }
    return cardList
  }

  return (
    <div>
      <Grid container spacing={1} style={{justifyContent: 'center'}} direction='column'>
        {cardrendering()}
      </Grid>
    </div>
  )
}
