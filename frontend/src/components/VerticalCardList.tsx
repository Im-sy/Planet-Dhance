import React from  'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ToSearchCard from './ToSearchCard'

export default function verticalCard(){


  const settings = {
    // dots: true,
    // fade: true,
    // infinite: true,
    slidesToShow: 3.3,
    slidesToScroll: 3,
    // autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    nextArrow: <div style={{display: "none"}}></div>,
  };
  return (
    <div  className="container">
      <h1>heelo</h1>
      <Slider {...settings}>
        <ToSearchCard 
          url={"https://picsum.photos/700/1200"}
          width="8.438rem"
          height="15rem"
          type={"ARTIST"}
          id={1}
        />
        <ToSearchCard 
          url={"https://picsum.photos/700/1200"}
          width="8.438rem"
          height="15rem"
          type={"ARTIST"}
          id={1}
        />
        <ToSearchCard 
          url={"https://picsum.photos/700/1200"}
          width="8.438rem"
          height="15rem"
          type={"ARTIST"}
          id={1}
        />
        <ToSearchCard 
          url={"https://picsum.photos/700/1200"}
          width="8.438rem"
          height="15rem"
          type={"ARTIST"}
          id={1}
        />
        <ToSearchCard 
          url={"https://picsum.photos/700/1200"}
          width="8.438rem"
          height="15rem"
          type={"ARTIST"}
          id={1}
        />
        <ToSearchCard 
          url={"https://picsum.photos/700/1200"}
          width="8.438rem"
          height="15rem"
          type={"ARTIST"}
          id={1}
        />
        <ToSearchCard 
          url={"https://picsum.photos/700/1200"}
          width="8.438rem"
          height="15rem"
          type={"ARTIST"}
          id={1}
        />
        <ToSearchCard 
          url={"https://picsum.photos/700/1200"}
          width="8.438rem"
          height="15rem"
          type={"ARTIST"}
          id={1}
        />
        <ToSearchCard 
          url={"https://picsum.photos/700/1200"}
          width="8.438rem"
          height="15rem"
          type={"ARTIST"}
          id={1}
        />
        <ToSearchCard 
          url={"https://picsum.photos/700/1200"}
          width="8.438rem"
          height="15rem"
          type={"ARTIST"}
          id={1}
        />
      </Slider>
    </div>
  );
}