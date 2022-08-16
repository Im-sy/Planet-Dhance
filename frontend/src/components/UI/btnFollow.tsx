import React, {useState} from 'react'
import Button from '@mui/material/Button';
import {follow, unfollow} from '../API/ComService'

interface followProps {
  isFollowed: boolean,
  fromId: number,
  toId: number
}

export default function BtnFollow({isFollowed, fromId, toId}: followProps) {
  const [isFollow, setIsFollow] = useState<boolean>(isFollowed);
  const handleClick = () => {
    setIsFollow(!(isFollow))
    if (isFollow) {
      unfollow(fromId, toId)
    } else {
      follow(fromId, toId)
    }
  }

  if (isFollow) {
    return (
      <div>
        <Button onClick={handleClick} variant="outlined" color="secondary">
          UnFollow
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <Button onClick={handleClick} variant="contained" color="secondary">Follow</Button>
      </div>
    )
  }
}
