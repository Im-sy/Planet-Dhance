import React from 'react'
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function GoBack() {
  return (
    <div>
      <IconButton aria-label="goback">
        <ArrowBackIcon />
      </IconButton>
    </div>
  )
}
