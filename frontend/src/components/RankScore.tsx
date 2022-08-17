import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/tailwind_reset.css';
import '../styles/styles.css';

import { rankingItem } from '../pages/Main';

import RankCard from './RankCard';

interface RankScoreProps {
  scores: rankingItem[];
}

export default function RankScore(props: RankScoreProps) {
  const { scores } = props;
  console.log(scores);

  const settings = {
    // dots: true,
    // fade: true,
    infinite: true,
    className: 'center',
    centerMode: true,
    centerPadding: '5%',
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1200,
    vertical: true,
    verticalSwiping: true,
    autoplaySpeed: 4000,
    cssEase: 'ease-out',
    nextArrow: <div style={{ display: 'none' }}></div>,
  };
  return (
    <div className="container__rank">
      <Slider {...settings}>
        {scores?.map((data, index) => (
            <RankCard key={index} img={data.nationFlag} value={data.nationName} point={data.clearCnt} type={0} />
          ))}
        {/* <RankCard img={scores[0].nationFlag} value={scores[0].nationName} type={0} />;
        <RankCard img={scores[1].nationFlag} value={scores[1].nationName} type={0} />; */}
        {/* <RankCard
            img={"여기에 국기 "}
            value={"&#65039"}
            type = {0}
          />
          <RankCard
            img={"여기에 국기 "}
            value={"&#65039"}
            type = {0}
          />
          <RankCard
            img={"여기에 국기 "}
            value={"&#65039"}
            type = {0}
          />
          <RankCard
            img={"여기에 국기 "}
            value={"&#65039"}
            type = {0}
          />
          <RankCard
            img={"여기에 국기 "}
            value={"&#65039"}
            type = {0}
          />
          <RankCard
            img={"여기에 국기 "}
            value={"&#65039"}
            type = {0}
          /> */}
          
      </Slider>
    </div>
  );
}
