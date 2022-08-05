import React, { CSSProperties, SetStateAction, useState } from 'react';

const progressStyle: CSSProperties = {
  position: 'absolute',
  top: '10px',
  width: '100vw',
  height: '10px',
  backgroundColor: 'gray',
  zIndex: '10'
};

interface ProgressProps {
  played : number;
}

export function ProgressBar(props : ProgressProps){
  const { played } = props
  return (
    <progress 
      style={progressStyle}
      className="progressbar"
      max={1}
      value={played}
    />
  )
}