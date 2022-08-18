import React from 'react';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { tagItemProps } from '../pages/ExplorePageList';

interface hashTagListProps {
  tagList: tagItemProps[];
}

export default function HashTagList({ tagList }: hashTagListProps) {
  const navigate = useNavigate();

  return (
    <div>
      <Stack direction="row" spacing={1} sx={{ height: '0px', color: 'white' }}>
        {tagList?.map((tagItem: tagItemProps) => (
          <Chip
            sx={{ display: 'absolute', top: '76vh', left: '0px', color: 'white' }}
            key={tagItem.id}
            label={tagItem.type}
            onClick={() => {
              navigate(`/searchsong/${tagItem.className}/${tagItem.id}`);
            }}
            variant="outlined"
          />
        ))}
      </Stack>
    </div>
  );
}
