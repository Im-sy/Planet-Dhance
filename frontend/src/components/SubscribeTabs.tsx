import React , { CSSProperties, useState } from 'react';
import { makeStyles } from '@mui/styles';
import SongPageGridView from './SongPageGridView'
import SubscribeFollowGridView from './SubscribeFollowGridView'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ClassNames } from '@emotion/react';
import { styled } from "@mui/material/styles";
import {Link} from 'react-router-dom';

const StyledTabPanel= styled(TabPanel)(`
padding : 0
`);

export default function SubscribeTabs() {
// url=
  const [value, setValue] = useState('1');
// follow
  // profile : profile_photo, nickname, introduction, nation, follower수, following 수
  const [profiles, setProfiles] = useState(
    [

      ["https://i.pinimg.com/736x/bb/25/56/bb255655d8846076ed5261a0ce2b7352--album-design-the-album.jpg", 'abcdefghijklmnopqrstuvwxyz', 'nice to meet you hello1 hello2 hello3 hello4 hello5 nice to meet you hello1 hello2 hello3 hello4 hello5 nice to meet you hello1 hello2 hello3 hello4 hello5 nice to meet you hello1 hello2 hello3 hello4 hello5'
      , '🇰🇷','100','200'],
      ["https://i.pinimg.com/736x/bb/25/56/bb255655d8846076ed5261a0ce2b7352--album-design-the-album.jpg", 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'nice to see you', 'KO','99999','200']
    
    ],
  )
  const [follow, setFollow] = useState(
    
    [ ["https://cdn.pixabay.com/photo/2022/06/27/08/37/monk-7287041_960_720.jpg",
                                 "https://cdn.pixabay.com/photo/2019/06/20/09/26/underwater-4286600_960_720.jpg",
                                "https://cdn.pixabay.com/photo/2022/07/13/06/35/baby-7318667_960_720.jpg",
                                "https://cdn.pixabay.com/photo/2022/06/27/02/22/woman-7286576__340.jpg",
                                "https://cdn.pixabay.com/photo/2022/07/13/11/56/cat-7319151__340.jpg"],

                                ["https://cdn.pixabay.com/photo/2022/06/24/17/35/relaxation-7282116__340.jpg",
                                "https://cdn.pixabay.com/photo/2022/07/27/07/37/thistle-7347371__340.jpg",
                                "https://cdn.pixabay.com/photo/2022/07/29/08/16/grapes-7351333__340.jpg",
                                "https://cdn.pixabay.com/photo/2022/07/30/14/53/underwear-7353957__340.jpg",
                                "https://cdn.pixabay.com/photo/2022/07/30/14/53/woman-7353956__340.jpg"],


                                ["https://cdn.pixabay.com/photo/2022/07/29/06/02/girl-7351176__340.jpg",
                                "https://cdn.pixabay.com/photo/2022/07/29/20/13/japanese-7352587__340.png",
                                "https://cdn.pixabay.com/photo/2022/07/30/13/35/woman-7353810__340.jpg",
                                "https://cdn.pixabay.com/photo/2022/07/25/22/23/lemon-7344615__340.jpg",
                                "https://cdn.pixabay.com/photo/2022/07/25/22/08/watermelon-7344602__340.jpg"],

                   
                                ]);


  const [likes, setLikes] = useState([
      
                                "https://cdn.pixabay.com/photo/2022/06/27/02/22/woman-7286576__340.jpg",
                                "https://cdn.pixabay.com/photo/2022/07/13/11/56/cat-7319151__340.jpg",
                                "https://cdn.pixabay.com/photo/2022/06/24/17/35/relaxation-7282116__340.jpg",
                                
                                "https://cdn.pixabay.com/photo/2022/06/27/08/37/monk-7287041_960_720.jpg",
                                 "https://cdn.pixabay.com/photo/2019/06/20/09/26/underwater-4286600_960_720.jpg",
                                "https://cdn.pixabay.com/photo/2022/07/13/06/35/baby-7318667_960_720.jpg",

                                "https://cdn.pixabay.com/photo/2022/07/27/07/37/thistle-7347371__340.jpg",
                                "https://cdn.pixabay.com/photo/2022/07/29/08/16/grapes-7351333__340.jpg",
                                "https://cdn.pixabay.com/photo/2022/07/30/14/53/underwear-7353957__340.jpg",
                                
                                "https://cdn.pixabay.com/photo/2022/07/30/14/53/woman-7353956__340.jpg",
                                "https://cdn.pixabay.com/photo/2022/07/29/06/02/girl-7351176__340.jpg",
                                "https://cdn.pixabay.com/photo/2022/07/29/20/13/japanese-7352587__340.png",

                                "https://cdn.pixabay.com/photo/2022/07/30/13/35/woman-7353810__340.jpg",
                                "https://cdn.pixabay.com/photo/2022/07/25/22/23/lemon-7344615__340.jpg",
                                "https://cdn.pixabay.com/photo/2022/07/25/22/08/watermelon-7344602__340.jpg",

                                "https://cdn.pixabay.com/photo/2022/07/30/22/42/portrait-7354652__340.jpg",
                                "https://cdn.pixabay.com/photo/2022/07/30/18/24/dog-7354347__340.jpg",
                                "https://cdn.pixabay.com/photo/2022/07/27/20/31/robot-7348708__340.png"

                                  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const useStyles = makeStyles(() => ({
    tab: { 
        '& .MuiBox-root': {
          padding: '0px',
          },
        },
    }));

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value} >
        <Box sx={{ }}  >
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab label="Follow" value="1" />
            <Tab label="Likes" value="2" />
          </TabList>
        </Box>
  

        <StyledTabPanel value="1" >
          <SubscribeFollowGridView urls={follow} profiles={profiles}/>
        
        </StyledTabPanel>

        <StyledTabPanel value="2">
            <SongPageGridView urls={likes}/>
        
        </StyledTabPanel>
      </TabContext>
    </Box>
  );
}









