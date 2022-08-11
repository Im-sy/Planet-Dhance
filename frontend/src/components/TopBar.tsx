import React from 'react'
import topLogo from '../styles/navbtns/topLogo.png'

export default function TopBar() {
  return (
    <div style={{position:'fixed', display:'flex', justifyContent:'center',zIndex:1000, top: 0, left: 0, right: 0, width:'100%'}}>
      <img src={topLogo} alt="topLogo" width='45%' height='5vh'></img>
    </div>
  )
}