import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ActionAreaCard from './Card';
import ToSearchCard from './ToSearchCard';
import '../styles/tailwind_reset.css'
import '../styles/styles.css'



export default class Carousel extends Component {
  render() {
    const settings = {
      // dots: true,
      // fade: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 5000,
      cssEase: 'linear',
      nextArrow: <div style={{display: "none"}}></div>,
    };
    return (
      <div  className="container">
        {/* <h2>Auto Play</h2> */}
        <Slider {...settings}>
            <ToSearchCard id={35}
              url="/resource/carousel/hot.jpg"
              width="95.5%"
              height="50%"
              type="ARTIST"
            />
            <ToSearchCard id={48}
              url="/resource/carousel/latest.jpg"
              width="95.5%"
              height="50%"
              type="TITLE"
            />
            <ToSearchCard id={60}
              url="/resource/carousel/hotsong_hot.jpg"
              width="95.5%"
              height="50%"
              type="TITLE"
            />
        </Slider>
      </div>
    );
  }
}
