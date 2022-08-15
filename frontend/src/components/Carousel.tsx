import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ActionAreaCard from './Card';
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
      autoplaySpeed: 2000,
      cssEase: 'linear',
      nextArrow: <div style={{display: "none"}}></div>,
    };
    return (
      <div  className="container">
        <h2>Auto Play</h2>
        <Slider {...settings}>
            <ActionAreaCard prevPage={'main'} videoId={1}
              url="https://picsum.photos/1250/500"
              width="100%"
              height="200px"
            />
            <ActionAreaCard prevPage={'main'} videoId={2}
              url="https://picsum.photos/1300/500"
              width="100%"
              height="200px"
            />
            <ActionAreaCard prevPage={'main'} videoId={3}
              url="https://picsum.photos/1310/500"
              width="100%"
              height="200px"
            />
        </Slider>
      </div>
    );
  }
}
