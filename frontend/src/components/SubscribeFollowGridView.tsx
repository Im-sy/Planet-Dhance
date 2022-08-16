import React, { CSSProperties, SetStateAction, useState } from 'react';
import Grid from '@mui/material/Grid';
import SubscribeFollowCard from './SubscribeFollowCard';
import Stack from '@mui/material/Stack';
import {followUserProps} from './SubscribeTabs';

interface SubscribeFollowGridViewProps {
  profiles: followUserProps[]
}

export default function SubscribeFollowGridView({profiles}:SubscribeFollowGridViewProps) {
  // 1. 해당 유저가 FOLLOW한 유저들과, 그 유저들의 NICKNAME, INTRODUCTION, 최근 영상 5개 가져와야 함
  
  return (
    <div>
      <Stack  spacing={1} style={{justifyContent: 'center'}} direction='column'>
        {profiles?.map((profile: followUserProps) => (
          <Grid item sm={4} key={profile.id}>
            <SubscribeFollowCard
              profileImg={profile.imgUrl}
              nickname={profile.nickname}
              introduction={profile.introduce}
              videoList={profile.videoList}
              nation={profile.nation}
              width="16vw"
              height="12vh" />
          </Grid>
        ))}
      </Stack>
    </div>
  )
}
