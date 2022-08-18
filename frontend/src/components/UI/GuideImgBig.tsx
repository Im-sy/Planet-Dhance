import React, {useState, CSSProperties} from 'react';
import Button from '@mui/material/Button';
import img from '../../pages/static/Planet. dhance.png'



function GuideImage(){
  return (
    <Button sx={{ position: 'absolute',
    top : '20vh',
    width: '100vw',
    height: '65vh',
    zIndex: '0',
    transform : 'scaleX(-1)',
    opacity: '0.7',
    }}>
        <img src={img} alt="letsDance" width="100%" height="100%"></img>
      </Button>
  )
}


export default GuideImage;