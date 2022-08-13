import React from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { clearListItem } from '../pages/MyPage';
import ActionAreaCard from './Card';

interface clearListProps {
	clearList: clearListItem[],
}

export default function MyPageClearSongs({clearList}: clearListProps) {
	const cardrendering = () => {
		const cardList = []
		for (let i=0; i<5; i++) {
		  cardList.push(
			<Grid item sm={4}>
				  <CardMedia
					style={{
					  width: '10vw',
					  height: '10vw',
					}}
					component="img"
					// image={urls[i]}
					image="https://i.pinimg.com/736x/bb/25/56/bb255655d8846076ed5261a0ce2b7352--album-design-the-album.jpg"
					alt="user upload video"
				  />
			</Grid>
		  )
		}
		return cardList
	  }

	
	
  return (
    <div>
		<CardContent sx={{ p : 1}}>
			<Grid container spacing={0.4} direction='row'>
				{/* {cardrendering()} */}
				{clearList.map((clearItem: clearListItem) => (
				<Grid item sm={4} key={clearItem.title}>
					<Card sx={{ maxWidth: "28.2vw"}}>
						<CardActionArea >
							<CardMedia
								style={{
									width: "28.2vw",
									height: "30vh",
								}}
								component="img"
								image={"https://i7d201.p.ssafy.io/"+clearItem.imgUrl}
								alt="clearItem"
							/>
						</CardActionArea>
					</Card>
				</Grid>
        ))}
			</Grid>
		</CardContent>

    </div>
  )
}
