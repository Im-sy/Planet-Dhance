import React, { CSSProperties, SetStateAction, useState } from 'react';
import Grid from '@mui/material/Grid';
import ActionAreaCard from './Card';
import { videoListProps, contentItem } from '../pages/MyPage';

interface gridViewProps {
  videoList: videoListProps
  prevPage: string
}

export default function SongPageGridView({videoList, prevPage}: gridViewProps) {
  // const cardrendering = () => {
  //   const cardList = []
  //   for (let i=0; i<18; i++) {
  //     cardList.push(
  //       <Grid item sm={4}>
  //         <ActionAreaCard
  //           url={props.urls[i]}
  //           width="28.2vw"
  //           height="30vh" />
  //       </Grid>
  //     )
  //   }
  //   return cardList
  // }

  return (
    <div>
      <Grid container spacing={0.4} style={{justifyContent: 'center'}}>
          {/* {cardrendering()} */}
          {videoList?.content.map((contentItem: contentItem) => (
          <Grid item sm={4} key={contentItem.videoId}>
            <ActionAreaCard prevPage={prevPage} videoId={contentItem.videoId}
              url={contentItem.imgUrl}
              width="28.2vw"
              height="30vh" />
          </Grid>
          ))}
      </Grid>
    </div>
  )
}
