import React from 'react'
import './Emoji.css'

interface emojiProps {
	emoji: string
}

export default function Emoji({emoji}: emojiProps) {

	const rendering = () => {
		const res = []
		for (let i=0; i<2; i++) {
			res.push(<span className="xsmemoji low" style={{marginLeft: Math.floor(Math.random() * 400) + 1}}>{emoji}</span>)
			res.push(<span className="xsmemoji mid" style={{marginLeft: Math.floor(Math.random() * 400) + 1}}>{emoji}</span>)
			res.push(<span className="xsmemoji top" style={{marginLeft: Math.floor(Math.random() * 400) + 1}}>{emoji}</span>)
		}
		for (let i=0; i<3; i++) {
			res.push(<span className="smemoji low" style={{marginLeft: Math.floor(Math.random() * 400) + 1}}>{emoji}</span>)
			res.push(<span className="smemoji mid" style={{marginLeft: Math.floor(Math.random() * 400) + 1}}>{emoji}</span>)
			res.push(<span className="smemoji top" style={{marginLeft: Math.floor(Math.random() * 400) + 1}}>{emoji}</span>)
		}
		for (let i=0; i<3; i++) {
			res.push(<span className="lgemoji low" style={{marginLeft: Math.floor(Math.random() * 400) + 1}}>{emoji}</span>)
			res.push(<span className="lgemoji mid" style={{marginLeft: Math.floor(Math.random() * 400) + 1}}>{emoji}</span>)
			res.push(<span className="lgemoji top" style={{marginLeft: Math.floor(Math.random() * 400) + 1}}>{emoji}</span>)
		}
		for (let i=0; i<2; i++) {
			res.push(<span className="xlgemoji low" style={{marginLeft: Math.floor(Math.random() * 400) + 1}}>{emoji}</span>)
			res.push(<span className="xlgemoji mid" style={{marginLeft: Math.floor(Math.random() * 400) + 1}}>{emoji}</span>)
			res.push(<span className="xlgemoji top" style={{marginLeft: Math.floor(Math.random() * 400) + 1}}>{emoji}</span>)
		}
		return res
	}
	
  return (
    <div className="emoji">
			<div className="fadeoutemoji">
				{rendering()}
			</div>
    </div>
  )
}
