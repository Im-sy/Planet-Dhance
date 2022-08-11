
import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/tailwind_reset.css'
import '../styles/styles.css'

import RankCard from './RankCard';


export default class RankScore extends Component {
  render() {
    const settings = {
      // dots: true,
      // fade: true,
      infinite: true,
      className: "center",
      centerMode: true,
      centerPadding: "5%",
      autoplay : true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 1200,
      vertical: true,
      verticalSwiping: true,
      autoplaySpeed: 1000,
      cssEase: 'ease-out',
      nextArrow: <div style={{display: "none"}}></div>,
    };
    return (
      <div  className="container">
        <Slider {...settings}>
          <RankCard
            img={"여기에 국기 "}
            value={"&#65039"}
            type = {0}
          />
          <RankCard
            img={"여기에 국기 "}
            value={"여기엔 검색 결과 값2"}
            type = {0}
          />
          <RankCard
            img={"여기에 국기 "}
            value={"여기엔 검색 결과 값3"}
            type = {0}
          />
          <RankCard
            img={"여기에 국기 "}
            value={"여기엔 검색 결과 값4"}
            type = {0}
          />
          <RankCard
            img={"여기에 국기 "}
            value={"여기엔 검색 결과 값5"}
            type = {0}
          />
        </Slider>
      </div>
    );
  }
}
