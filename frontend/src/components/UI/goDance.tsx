import React from 'react'
import Button from '@mui/material/Button';
import letsDance from '../../styles/navbtns/letsDance.png'
import { challenge } from '../API/MusicService';
import { useNavigate } from 'react-router-dom';
import { CSSProperties } from '@mui/styled-engine';

interface danceProps {
  musicId: number,
  sx?: CSSProperties,
}

export default function GoDance({ musicId, sx }: danceProps) {
  const navigate =  useNavigate();

  const handleClick = () => {
    // console.log("let's dance")
    navigate("/challenge",
          {state: { musicId : {musicId} } });     
    }
  
  if (typeof sx === 'undefined') {
    let sx = { borderRadius: "50%", display: "absolute", top: "70vh", left: "80vw"}
    return (
      <div>
        <Button sx={sx} onClick={handleClick}>
          <img src={letsDance} alt="letsDance" width="50"></img>
        </Button>
      </div>
    )
  } else {
    return (
      <div>
        <Button sx={sx} onClick={handleClick}>
          <img src={letsDance} alt="letsDance" width="50"></img>
        </Button>
      </div>
    )
  }
}
