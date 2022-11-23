import React, { CSSProperties, SetStateAction, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ActionAreaCard from './Card';
import { videoListProps, contentItem } from '../pages/MyPage';
import { favLike } from './API/ComService'
import { scrollVideoHitLike } from './API/ScrollService';
import { useSelector } from 'react-redux';
import { rootState } from '../reducer';
import { CardContent } from '@mui/material';

interface gridViewProps {
  videoList: contentItem[]
  prevPage: string
}

export default function SongPageGridView({videoList, prevPage}: gridViewProps) {

  return (
    <div>
      <CardContent sx={{ p : 1}}>
        <Grid container spacing={0.4} style={{justifyContent: 'center'}}>
            {/* {cardrendering()} */}
            {videoList?.map((contentItem: contentItem) => (
            <Grid item sm={4} key={contentItem.videoId}>
              <ActionAreaCard prevPage={prevPage} videoId={contentItem.videoId}
                url={contentItem.imgUrl}
                width="28.2vw"
                height="30vh" />
            </Grid>
            ))}
        </Grid>
      </CardContent>
    </div>
  )
}
