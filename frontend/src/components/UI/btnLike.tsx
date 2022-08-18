import React, {useState} from 'react'
import {like as Like, unlike as unLike} from '../API/ComService'
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';

interface btnLikeProps {
  like: boolean,
  userId: number,
  videoId: number,
}

export default function BtnLike({like, userId, videoId}: btnLikeProps) {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [isLike, setIsLike] = useState<boolean>(like)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isLike === true) {
      setIsLike(!isLike);
      unLike(userId, videoId)
    } else {
      setIsLike(!isLike);
      Like(userId, videoId)
    }
  }
  
  return (
    <div>
      <Checkbox
      sx={{
        color: pink[800],
        '&.Mui-checked': {
          color: pink[600],
        },
        '& .MuiSvgIcon-root': { fontSize: 50 },
        display: 'absolute',
        top : '51vh',
        left: '80vw'
      }}
        {...label}
        checked={isLike}
        onChange={handleChange}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
      />
    </div>
  );
}
