import React from  'react';
import { artistItem } from '../pages/Main';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ToSearchCard from './ToSearchCard'

interface verticalCardProp {
  artistList: artistItem[];
}

export default function verticalCard({artistList}: verticalCardProp){


  const settings = {
    // dots: true,
    // fade: true,
    // infinite: true,
    slidesToShow: 2.8,
    slidesToScroll: 1,
    // autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    nextArrow: <div style={{display: "none"}}></div>,
  };
  return (
    <div  className="container">
      <h1>Hot Artist</h1>
      <Slider {...settings}>
        {artistList?.map((artistItem: artistItem) => (
          <ToSearchCard  key={artistItem.tagId}
            url={artistItem.imgUrl}
            width="8.438rem"
            height="15rem"
            type={"ARTIST"}
            id={artistItem.tagId}
          />
        ))}
      </Slider>
    </div>
  );
}