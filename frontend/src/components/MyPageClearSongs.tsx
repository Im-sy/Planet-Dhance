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
  return (
    <div>
			<CardContent sx={{ p : 1}}>
				<Grid container spacing={0.4} direction='row' >
					{clearList?.map((clearItem: clearListItem) => (
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
