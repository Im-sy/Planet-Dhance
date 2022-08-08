import React , { CSSProperties, useState } from 'react';
import NavBar from '../components/NavBar'
import MyPageProfile from '../components/MyPageProfile'
import MyPageAchievements from '../components/MyPageAchievements'
import MyPageClearSongs from '../components/MyPageClearSongs'
import SongPageGridView from '../components/SongPageGridView'



export default function MyPage() {
  const [profiles, setProfiles] = useState(
    [

      ["https://i.pinimg.com/736x/bb/25/56/bb255655d8846076ed5261a0ce2b7352--album-design-the-album.jpg", 'ABCDEFGHIJKL', 'nice to meet you hello1 hello2 hello3 hello4 hello5 nice to meet you hello1 hello2 hello3 hello4 hello5 nice to meet you hello1 hello2 hello3 hello4 hello5 nice to meet you hello1 hello2 hello3 hello4 hello5'
      , '🇰🇷', '100', '200'],
     
    ],
  )

  const [myVideo, setmyVideo] = useState(["https://cdn.pixabay.com/photo/2022/06/27/08/37/monk-7287041_960_720.jpg",
                                 "https://cdn.pixabay.com/photo/2019/06/20/09/26/underwater-4286600_960_720.jpg",
                                "https://cdn.pixabay.com/photo/2022/07/13/06/35/baby-7318667_960_720.jpg",

                                "https://cdn.pixabay.com/photo/2022/06/27/02/22/woman-7286576__340.jpg",
                                "https://cdn.pixabay.com/photo/2022/07/13/11/56/cat-7319151__340.jpg",
                                "https://cdn.pixabay.com/photo/2022/06/24/17/35/relaxation-7282116__340.jpg",

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

  return (
    <div>

      <div>
        <MyPageProfile 
            img={profiles[0][0]}
            nickname={profiles[0][1]}
            introduction={profiles[0][2]}
            nation={profiles[0][3]}
            follower={9999}
            following={1000}
            type={1}
            // 프로필 부분 패딩과 마진 설정
            sx={{ display: 'flex', flexDirection: 'column', width: '5rem',  borderRadius: "50%", padding:" 0px 0.5rem", margin:"0.5rem 0.2rem" }}
          />

      </div>

      {/* 업적 */}
      <div style={{ marginTop : 30, marginLeft : 10, marginBottom : 10, marginRight : 10 }}>
        <h2>Achievments</h2>
        <MyPageAchievements clear={30} />
      </div>

      {/* clear한 곡들  */}
      <div style={{  marginLeft : 10, marginBottom : 10, marginRight : 10 }}>
        <h2>Clear Songs</h2>
        <MyPageClearSongs />
      </div>

      {/* 내가 올린 영상 */}
      <div>
        <h2  style={{  marginLeft : 10 , marginBottom : 5}}>My Videos</h2>
        <SongPageGridView urls={myVideo}/>
      </div>

      <NavBar />
    </div>
  )
}