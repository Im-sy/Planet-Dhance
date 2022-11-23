import React, {useState, CSSProperties} from 'react';
import Button from '@mui/material/Button';
import img from '../../pages/static/Planet. dhance.png'



function GuideImage(){
  return (
    <Button sx={{ position: 'absolute',
    zIndex : '1',
    top: '10vh',
    left : '65vw',
    width: '35vw',
    height: '30vh',
    opacity: '0.7',
    transform : 'scaleX(-1)',}}>
        <img src={img} alt="letsDance" width="100%" height="100%"></img>
      </Button>
  )
}


export default GuideImage;