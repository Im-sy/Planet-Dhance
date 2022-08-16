//ES6 , 썸네일, 해시태그 모두 모아서 보내기 react router dom use navigate state에 넣어서 썸네일 페이지
import React, { Component, useState, useEffect } from 'react';

import './hash.css';
import { WithContext as ReactTags } from 'react-tag-input';
import { ToggleButton } from '@mui/material';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import CheckIcon from '@mui/icons-material/Check';
import ThumbnailCard from '../components/ThumbnailCard';

import { useLocation } from 'react-router-dom';  // 데이터 받아오기



const img1 = 'https://picsum.photos/1400/1200';

const imageList = [
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
];

const Container = styled.div`
  overflow: hidden;
`;

const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
    width: 8.438rem;
  }
`;

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={
      'slick-prev slick-arrow' + (currentSlide === 0 ? ' slick-disabled' : '')
    }
    aria-hidden="true"
    aria-disabled={currentSlide === 0 ? true : false}
    type="button"
  >
    Previous
  </button>
);
const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={
      'slick-next slick-arrow' +
      (currentSlide === slideCount - 1 ? ' slick-disabled' : '')
    }
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1 ? true : false}
    type="button"
  >
    Next
  </button>
);

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

function UpLoad() {
  //-------------------------------------------------------------------------------------
  //
  //                         데이터 받아오기
  //
  //--------------------------------------------------------------------------------------
  const location = useLocation(); 
  // const thumbnail = location.state.thumbnail;
  console.log(location);

  
  // useEffect( ()=>{

  // } , [video])

  // function checkThumbnail() {
  //   console.log(thumbnail)
  //   console.log(video)
  //   console.log(dummy)
  //   console.log(hashtags)
  //   setTimeout(checkThumbnail)
  // }



  const [tags, setTags] = useState([
    { id: '1', type: 'song', className: 'song' },
    { id: '2', type: 'artist', className: 'artist' },
    { id: '3', type: 'nation', className: 'nation' },
    { id: '2', type: 'nickname', className: 'nickname' },
  ]);

  const [pick, setPick] = useState(0);

  const [custom, setCustom] = useState([{ id: '5', type: 'planetDhance' }]);
  const handleDelete = (i) => {
    setCustom(custom.filter((custom, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setCustom([...custom, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = custom.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setCustom(newTags);
  };
  // const [imgList, setImgList] = useState([img]);
  const handleTagClick = (index) => {
    console.log('The tag at index ' + index + ' was clicked');
  };
  
  const settings = {
    dots: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    centerMode: true,
    afterChange: function (data) {
      console.log(data);
      handleThumbNailClick(data);
    },
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
  };

  const handleThumbNailClick = (data) => {
    setPick(data);
    console.log(pick);
  };
  const [selected, setSelected] = useState(false)
  useEffect(() => {
    //axios
  }, []);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div>
     

      <Container>
        <h1>Thumbnails</h1>
        <StyledSlider
          dots={true}
          slidesToShow={2}
          slidesToScroll={1}
          cssEase={`linear`}
          centerMode={true}
          beforeChange={(slide, newSlide) => {
            // const curImg = imageList.find((img, index) => {
            const curImg = imageList.find((img, index) => {
              if (index === newSlide) {
                handleThumbNailClick({ img: img, index: index });
              }
            });
            // console.log(newSlide);
            setCurrentSlide(newSlide);
          }}
          centerPadding={'50px'}
        >
          {/* {[...imageList].map((image, i) => { */}
          {[...imageList].map((image, i) => {
            return (
              <div
                onClick={() => {
                  handleThumbNailClick({ img: image, index: i });
                }}
              >
                <ThumbnailCard
                  key={i}
                  url={image}
                  width="8.438rem"
                  height="15rem"
                  id={i}
                  curSlide={currentSlide}
                />
              </div>
            );
          })}
        </StyledSlider>
      </Container>
      <ToggleButton
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
      ><CheckIcon /> private
      </ToggleButton>
      <h1> Tags </h1>
      <div>
        <ReactTags
          tags={tags}
          delimiters={delimiters}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          labelField={'type'}
          autocomplete
          readOnly
        />
        <div>
          <br />
        </div>
        <ReactTags
          tags={custom}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          labelField={'type'}
          inputFieldPosition="bottom"
          autocomplete
        />
      </div>
      <button>back</button>
      <button>upload</button>
    </div>
  );
}

export default UpLoad;
