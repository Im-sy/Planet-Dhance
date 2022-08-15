import React, { useState } from 'react'

interface MyPageAchievementsProps {
	clear: number,
}

export default function MyPageAchievements(props : MyPageAchievementsProps) {
	const { clear } = props ;
	
	if (clear <= 3) {
		return (
			<div>🌱</div>
		)
	} else if (clear > 3 && clear <= 5) {
		return (
			<div>🍀</div>
		)
	} else if (clear > 5 && clear <= 10) {
		return (
			<div>🌷</div>
		)	
	} else {
		return (
			<div>💐</div>
		)	
	}
}
