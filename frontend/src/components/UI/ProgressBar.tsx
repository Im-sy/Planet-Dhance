import React, { CSSProperties, SetStateAction, useState } from 'react';

const progressStyle: CSSProperties = {
  position: 'absolute',
  top: '4vh',
  width: '94vw',
  height: '4px',
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