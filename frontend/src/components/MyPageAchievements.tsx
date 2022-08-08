import React, { useState } from 'react'

interface MyPageAchievementsProps {
	clear: number,
}

export default function MyPageAchievements(props : MyPageAchievementsProps) {
	const { clear } = props ;
	
	const rendering = () => {
		const res = []
		for (let i=0; i<101; i++){
			if (clear > i && i%10===0 ){
				res.push(<span style={{marginLeft: 1, marginTop: 3}}>💯</span>)
			}
		}
		return res
	}
	
  return (
    <div>
		{rendering()}
    </div>
  )
}
