import React, { CSSProperties, SetStateAction, useEffect, useState } from 'react';
import ActionAreaCard from '../components/Card';
import Carousel from '../components/Carousel'
import RankScore from '../components/RankScore'
import Planet from '../components/Planet'
import GridView from '../components/GridView'
import NavBar from '../components/NavBar'



export default function Main() {

    return(
        <div>
            <div>
                logo component
            </div>

            {/* 상단 캐로셀 */}
            <Carousel/>                   
        

            {/* 가로카드 */}
            <div>
            <p>#BTS</p>
                <ActionAreaCard
                    url="https://cdn.pixabay.com/photo/2019/06/20/09/26/underwater-4286600_960_720.jpg"
                    width="8.438rem"
                    height="15rem" />
            </div>


           

            {/* GridView */}
            <div>
                <h2> Hot Clips</h2>
                <GridView />
            </div>


            
            {/* ranking */}
            <div>

                <RankScore />
                <Planet />

            </div>

             {/* NavBar - 제일 하단에 두기!*/}
             <NavBar />

        </div>

    );

}
  