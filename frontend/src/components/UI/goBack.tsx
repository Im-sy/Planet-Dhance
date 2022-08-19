import React from 'react'
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function GoBack() {
  const navigate = useNavigate()
  return (
    
      <IconButton sx={{ display: 'absolute',
        top : '4vh',
        left: '1vw',
        color: 'white',
        '& .MuiSvgIcon-root': { fontSize: 33 },}}  onClick={()=>{navigate(-1)}} aria-label="goback">
        <ArrowBackIcon />
      </IconButton>
   
  )
}
