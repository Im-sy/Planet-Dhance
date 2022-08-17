import React from 'react'
import Button from '@mui/material/Button';
import letsDance from '../../styles/navbtns/letsDance.png'
import { challenge } from '../API/MusicService';
import { useNavigate } from 'react-router-dom';

interface danceProps {
  musicId: number,
  userId: number
}

export default function GoDance({ musicId, userId }: danceProps) {
  const navigate =  useNavigate();

  const handleClick = () => {
    // console.log("let's dance")
    challenge(musicId, userId)
      .then(res => {
        navigate('/challenge');      
    })
  }
  return (
    <div>
      <Button sx={{ borderRadius: "50%" }} onClick={handleClick}>
        <img src={letsDance} alt="letsDance" width="50"></img>
      </Button>
    </div>
  )
}
