
import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './tailwind_reset.css'

import SearchSongInfo from './SearchSongInfo';



export default class AutoPlay extends Component {
  render() {
    const settings = {
      // dots: true,
      // fade: true,
      infinite: true,
      slidesToShow: 1.2,
      slidesToScroll: 1,
      autoplay: true,
      speed: 500,
      vertical: true,
      verticalSwiping: true,
      autoplaySpeed: 2000,
      cssEase: 'linear',
      nextArrow: <div style={{display: "none"}}></div>,
    };
    return (
      <div  className="container">
        <h2>Rank</h2>
        <Slider {...settings}>
          <SearchSongInfo 
          img={'여기에 이미지 url 혹은 blob'}
          value={'Nation'}
          type={0}
          sx={{ display: 'flex', flexDirection: 'column', width: '5rem', padding:" 0px 1rem", margin:"0.5rem 1rem" }}
          />
          <SearchSongInfo 
          img={'여기에 이미지 url 혹은 blob'}
          value={'Nation'}
          type={0}
          sx={{ display: 'flex', flexDirection: 'column', width: '5rem', padding:" 0px 1rem", margin:"0.5rem 1rem" }}
          />
          <SearchSongInfo 
          img={'여기에 이미지 url 혹은 blob'}
          value={'Nation'}
          type={0}
          sx={{ display: 'flex', flexDirection: 'column', width: '5rem', padding:" 0px 1rem", margin:"0.5rem 1rem" }}
          />
          <SearchSongInfo 
          img={'여기에 이미지 url 혹은 blob'}
          value={'Nation'}
          type={0}
          sx={{ display: 'flex', flexDirection: 'column', width: '5rem', padding:" 0px 1rem", margin:"0.5rem 1rem" }}
          />
        </Slider>
      </div>
    );
  }
}
