import React, { useState } from 'react'

interface MyPageAchievementsProps {
	clear: number,
}

export default function MyPageAchievements(props : MyPageAchievementsProps) {
	const { clear } = props ;
	
	if (clear <= 3) {
		return (
			<p style={{ fontSize: '50px'}}>🌱</p>
		)
	} else if (clear > 3 && clear <= 5) {
		return (
			<p style={{ fontSize: '50px'}}>🍀🌱</p>
		)
	} else if (clear > 5 && clear <= 10) {
		return (
			<p style={{ fontSize: '50px'}}>🌷🍀🌱</p>
		)	
	} else {
		return (
			<p style={{ fontSize: '50px'}}>💐🌷🍀🌱</p>

		)	
	}
}