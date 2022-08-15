import React, {useState} from 'react'
import {like as Like, unlike as unLike} from '../API/ComService'
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

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
      Like(userId, videoId)
    } else {
      unLike(userId, videoId)
    }
  }
  
  return (
    <div>
      <Checkbox
        {...label}
        checked={isLike}
        onChange={handleChange}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
      />
    </div>
  );
}
