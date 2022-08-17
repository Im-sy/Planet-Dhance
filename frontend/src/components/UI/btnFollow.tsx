import React, {useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import {follow, unfollow} from '../API/ComService'

interface followProps {
  isFollowed: boolean,
  fromId: number,
  toId: number
}

export default function BtnFollow({isFollowed, fromId, toId}: followProps) {
  const [isFollow, setIsFollow] = useState(isFollowed);

  const handleClick = () => {
    if (isFollow) {
      unfollow(fromId, toId)
        .then(() => {
          console.log("isFollow before", isFollow);
          setIsFollow(current => !current);
          console.log("isFollow after", isFollow);
        }
      )
    } else {
      follow(fromId, toId)
        .then(() => {
          console.log("isFollow before", isFollow);
          setIsFollow(current => !current);
          console.log("isFollow after", isFollow);
        }
      )
    }
  }

  useEffect(() => {
    console.log(isFollow);
  }, [isFollow])

  if (isFollow) {
    return (
      <div>
        <Button onClick={handleClick} variant="outlined" color="secondary">
          Unfollow
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
