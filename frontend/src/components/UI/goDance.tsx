import React from 'react'
import Button from '@mui/material/Button';
import letsDance from '../../styles/navbtns/letsDance.png'

export default function GoDance() {
  const handleClick = () => {
    console.log("let's dance")
  }
  return (
    <div>
      <Button sx={{ borderRadius: "50%" }} onClick={handleClick}>
        <img src={letsDance} alt="letsDance" width="50"></img>
      </Button>
    </div>
  )
}
