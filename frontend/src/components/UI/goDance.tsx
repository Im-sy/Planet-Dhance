import React from 'react'
import Button from '@mui/material/Button';
import TryIcon from '@mui/icons-material/Try'

export default function GoDance() {
  return (
    <div>
      <Button variant="outlined" startIcon={<TryIcon />}>
        Try it!
      </Button>
    </div>
  )
}
