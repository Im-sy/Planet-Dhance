import React from 'react'
import topLogo from '../styles/navbtns/topLogo.png'
import { useNavigate } from "react-router-dom"

export default function TopBar() {
  const navigate = useNavigate();
  return (
    <div onClick={()=>{navigate('/')}} style={{position:'fixed', display:'flex', justifyContent:'center',zIndex:1000, top: 0, left: 0, right: 0, width:'100%', backgroundColor:'#060318ff'}}>
      <img src={topLogo} alt="topLogo" width='45%' height='5vh'></img>
    </div>
  )
}
