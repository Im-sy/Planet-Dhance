import React from 'react'
import Button from '@mui/material/Button';
import letsDance from '../../styles/navbtns/letsDance.png'
import { challenge } from '../API/MusicService';
import { useNavigate } from 'react-router-dom';

interface danceProps {
  musicId: number,
}

export default function GoDance({ musicId }: danceProps) {
  const navigate =  useNavigate();

  const handleClick = () => {
    // console.log("let's dance")
    navigate("/challenge",
          {state: { musicId : {musicId} } });     
    }
  
  return (
    <div>
      <Button sx={{ borderRadius: "50%", display: "absolute", top: "70vh", 
    left: "80vw"}} onClick={handleClick}>
        <img src={letsDance} alt="letsDance" width="50"></img>
      </Button>
    </div>
  )
}
