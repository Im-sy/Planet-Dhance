import React , { CSSProperties, useState } from 'react';
import NavBar from '../components/NavBar'
import MyPageProfile from '../components/MyPageProfile'
import MyPageAchievements from '../components/MyPageAchievements'



export default function MyPage() {
  const [profiles, setProfiles] = useState(
    [

      ["https://i.pinimg.com/736x/bb/25/56/bb255655d8846076ed5261a0ce2b7352--album-design-the-album.jpg", 'ABCDEFGHIJKL', 'nice to meet you hello1 hello2 hello3 hello4 hello5 nice to meet you hello1 hello2 hello3 hello4 hello5 nice to meet you hello1 hello2 hello3 hello4 hello5 nice to meet you hello1 hello2 hello3 hello4 hello5'
      , '🇰🇷', '100', '200'],
     
    ],
  )

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
      <div>
        <MyPageAchievements clear={30} />

      </div>

      {/* clear한 곡들  */}
      <div>


      </div>

      <NavBar />
    </div>
  )
}