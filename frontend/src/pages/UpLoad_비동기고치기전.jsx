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

import axios from 'axios';

const img1 = 'https://picsum.photos/1400/1200';



// const imageList = [
//   img1,
//   img1,
//   img1,
//   img1,
//   img1,
//   img1,
//   img1,
//   img1,
//   img1,
//   img1,
//   img1,
// ];

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
  const [imageList, setImageList] = useState([
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
  ]);
  const [recordedVideo, setRecordedVideo] = useState('init_video')
  
  const location = useLocation(); 
  const thumbnail = location.state.thumbnail;
  const [pick, setPick] = useState(thumbnail.thumbnail[0]);
  // const [pick, setPick] = useState();
  // const [pickedThumbnail, setPickedThumbnail] = useState()
  
  useEffect(
     () =>{
      const videoBlob = location.state.videoBlob;
      setRecordedVideo(videoBlob.videoFile)
      // const thumbnail = location.state.thumbnail;
      // console.log(thumbnail.thumbnail)
      // console.log(thumbnail.thumbnail[0])
      // const data = { img : thumbnail.thumbnail[0], index : 0 }
      // console.log(data)
      // handleThumbNailClick(data) // 첫 사진을 썸네일 default로 넣어주기
      // console.log(recordedVideo)
      console.log(pick)

    

      // uploadToServer()
    }

  , []  )
  console.log(location);
 




  const [tags, setTags] = useState([
    { id: '1', type: 'song', className: 'song' },
    { id: '2', type: 'artist', className: 'artist' },
    { id: '3', type: 'nation', className: 'nation' },
    { id: '2', type: 'nickname', className: 'nickname' },
  ]);




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
    const img = data.img
    setPick(img);
    console.log(pick);
    // console.log(pick.img);   // base64로 challenge page의 사진과 똑같은 형식
  };

  const [selected, setSelected] = useState(false)
  useEffect(() => {
    //axios
  }, []);
  const [currentSlide, setCurrentSlide] = useState(0);


  // -------------------------------------------------------------------------
  //
  //  서버로 전송
  //
  //------------------------------------------------------------------------


  const [jsonCustom, setJsonCustom] = useState()


  const uploadToServer = async () => {


    // if (pick===undefined){
    //   return alert('썸네일을 선택해주세요')
    // }


    const formData = new FormData(); // 저장할 곳

    // 1. 비디오
    const file = await new File([recordedVideo], 'video.webm', {
      type : "video/webm"
    });
    // console.log(file);
    await formData.append("inputFile", file, "videoFile.webm");

    for (var pair of formData.entries()) {
      console.log('비디오추가 : ',pair[0]+ ', ' + pair[1]); 
  }


    // 2. 선택한 썸네일
    // pick.img
      // 이미지 보내는 법
    // fetch(pick)
    let tmp
    await fetch(pick)
      .then((res) => res.blob())
      .then((blob2) => {
        const NewFile = new File([blob2], "video_thumbnail", {
          type: "image/png"
        });
        tmp = NewFile
        // setPickedThumbnail(NewFile);

      })
      .catch((err) => {
        alert("실패");
        console.log(err)
      });

    console.log(tmp)
    // console.log(pickedThumbnail)
   
    await formData.append("inputFile",tmp,"image.png")
    // await formData.append("inputFile",pickedThumbnail,"image.png")
    
    for (var pair of formData.entries()) {
      console.log('이미지추가 : ',pair[0]+ ', ' + pair[1]); 
  }



    
    // 3. 해시태그
    const jsonData = JSON.stringify({
      scope : "PUBLIC",
      userId : 25,
      musicId : 66,
      clear : true,
      
      tagList: custom
    })
    
    setJsonCustom(jsonData)
    
    const blob3 = await new Blob([jsonCustom], {type : "application/json"});
    await formData.append("challengeRequest", blob3, 'sampleJson'); 

    
    for (var pair of formData.entries()) {
      console.log('json추가 : ',pair[0]+ ', ' + pair[1]); 
  }

    
    
    
    // 4. 서버로 전송
   
    console.log('axios')
    
    const inputFile = formData

    axios
    .post("https://i7d201.p.ssafy.io/api/video/upload", inputFile)  // 최종적으로 진짜로 보내는 주소
    .then((res) => {
      console.log(res);
      console.log('성공')
    })
    .catch((err) => {
      alert("실패");
      console.log(err)
    });

  }










  
  return (
    <div>
     
      {/* thumbnail */}
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
    
          {/* 기존 */}
          {/* {[...imageList].map((image, i) => { */}
          {thumbnail.thumbnail.map((image, i) => {
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


      {/* private */}
      <ToggleButton
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
      ><CheckIcon /> private
      </ToggleButton>


      {/* Tags */}
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

      {/* Back / upload 버튼 */}
      <div>
      <button>back</button>
      <button onClick={uploadToServer}>uploadrrrr</button>
      {/* <button>upload</button> */}

      </div>
    </div>
  );
}

export default UpLoad;
