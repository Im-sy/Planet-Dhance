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


// private 체크박스 관련
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



// 뒤로가기, 업로드 버튼 관련
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


import { Navigate, useNavigate } from 'react-router-dom';

// user관련
import { useSelector } from 'react-redux';


const img1 = 'https://picsum.photos/1400/1200';



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



const privateStyle = {
  backgroundColor: 'rgba( 255, 255, 255, 1 )',
  color: 'rgba( 255, 255, 255, 1 )',
}

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

  
  const location = useLocation(); 

  const { isAuthenticated, user } = useSelector(
    (state) => state.authReducer
  );

  const thumbnail = location.state.thumbnail;
  const musicId = location.state.musicId.musicId
  const [pick, setPick] = useState(thumbnail.thumbnail[0]);
  const [tags, setTags] = useState(location.state.tagList.tagList)
  const [formData, setFormData] = useState()
  // const [pick, setPick] = useState();
  const [pickedVideoFile, setPickedVideoFile] = useState()  // 1개밖에 없지만 이름 통일성을 위해 이렇게 지음
  const [pickedThumbnailFile, setPickedThumbnailFile] = useState()
  const [pickedHashtagFile, setPickedHashtagFile] = useState()
 


  const initVideo = async () => {
    // 1. 비디오

    const videoBlob = location.state.videoBlob;
    const file = await new File([videoBlob.videoFile], 'video.webm', {
      type : "video/webm"
    });
    
    await setPickedVideoFile(file)
    console.log('video File : ',pickedVideoFile)
  
  }

  const updatePick = async () => {
    let tmp
    await fetch(pick)
      .then((res) => res.blob())
      .then((blob2) => {
        const NewFile = new File([blob2], "video_thumbnail", {
          type: "image/png"
        });
        tmp = NewFile
        console.log('ThumbnailFile',tmp)
      })
      .catch((err) => {
        alert("실패");
        console.log(err)
      });

    setPickedThumbnailFile(tmp)
  };

  const updateHashTag = async () => {
    // private 유무 판정
    // if (selected===false){
    //   setIstPrivate('PUBLIC')
    // }else{
    //   setIstPrivate('PRIVATE')
    // }
    console.log(selected)
    console.log(custom)
    // JSON 만들기
    const jsonData = JSON.stringify({
      // scope : "PUBLIC",
      scope : selected,
      userId : user.userId,
      musicId : musicId,
      clear : true,
      tagList: custom
    })
    console.log('jsonData',jsonData)
        
    const blob3 = await new Blob([jsonData], {type : "application/json"});
    setPickedHashtagFile(blob3)
    console.log("HashTagFile", blob3)
  }



  useEffect(
    () =>{
      console.log(location)
      console.log(tags)
      console.log(musicId)
      initVideo()
      updatePick()
      updateHashTag()
        console.log('video File : ',pickedVideoFile)
      }

      , []  )


      console.log(location);
      
      
      const [custom, setCustom] = useState([{ id: '5', type: 'planetDhance' }]);
      const [selected, setSelected] = useState('PUBLIC')

  // useEffect(  () => {
  //   async function tmp() {

  //     console.log(custom);
  //     const jsonData = JSON.stringify({
  //       scope : selected,
  //       userId : 25,
  //       musicId : 66,
  //       clear : true,
  //       tagList: custom
  //     })
  //     console.log('jsonData',jsonData)
          
  //     const blob3 = await new Blob([jsonData], {type : "application/json"});
  //     setPickedHashtagFile(blob3)
  //     console.log("HashTagFile", blob3)
  //   }
  //   tmp()
  // }, [custom,selected])


  // useEffect( () => {
  //   console.log(selected);
  // }, [selected])

  

  
  
  // const [tags, setTags] = useState([
  //   { id: '1', type: 'song11', className: 'song123' },
  //   { id: '2', type: 'artist', className: 'artist' },
  //   { id: '3', type: 'nation', className: 'nation' },
  //   { id: '2', type: 'nickname', className: 'nickname' },
  // ]);


  


  const handleDelete = (i) => {
    setCustom(custom.filter((custom, index) => index !== i));
  };


  const handleAddition =  (tag) => {
    console.log('before setCustom tag', tag)
    setCustom([...custom, tag]);
    console.log('after setCustom : ', custom)
    updateHashTag()  // 해시태그 JSON 최신화
    
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
    updatePick()  // 썸네일 최신화
    // console.log(pick.img);   // base64로 challenge page의 사진과 똑같은 형식
  };

 

  useEffect(() => {
    //axios
  }, []);
  const [currentSlide, setCurrentSlide] = useState(0);


  // -------------------------------------------------------------------------
  //
  //  서버로 전송
  //
  //------------------------------------------------------------------------



// video만 가져온 후, 다른 것들 넣기
  const navigate = useNavigate();
  const uploadToServer = async () => {

    const formData = new FormData();

    // let tmpFormData = formData
    console.log('Video File',pickedVideoFile)
    console.log('Thumbnail File',pickedThumbnailFile)
    console.log('HashTagFile',pickedHashtagFile)
  
    await formData.append("inputFile",pickedVideoFile,"videoFile.webm")
    await formData.append("inputFile",pickedThumbnailFile,"image.png")
    await formData.append("challengeRequest", pickedHashtagFile, 'sampleJson'); 

    
    // 4. 서버로 전송
   
    console.log('axios')
    
    const inputFile = formData
    for (var pair of inputFile.entries()) {
      console.log('최종데이터 : ',pair[0]+ ', ' + pair[1]); 
  }
    
    axios
    .post("https://i7d201.p.ssafy.io/api/video/upload", inputFile)  // 최종적으로 진짜로 보내는 주소
    .then((res) => {
      console.log(res);
      console.log('성공')
      
      navigate('/mypage')
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
            const curImg = thumbnail.thumbnail.find((img, index) => {
              if (index === newSlide) {
                handleThumbNailClick({ img: img, index: index });
              }
            });
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
      {/* <ToggleButton
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected)
          updateHashTag();
        }}
        sytle={privateStyle}
      ><CheckIcon /> private
      </ToggleButton> */}
    
      <div style={{display:'flex', justifyContent:'end'}}>
        <FormGroup>
          <FormControlLabel 
            control={<Checkbox
                      style={{
                        color: "rgba(255,255,255,0.5)"
                      }}
                      onChange={async () => {
                      // setSelected(selected===false?!selected)
                      setSelected(selected==='PRIVATE'? 'PUBLIC':'PRIVATE' )
                      // setTimeout(updateHashTag,5000)
                      updateHashTag();
                      }}/>} 
            Style={{color: 'blue'}}
            label="private" />
        </FormGroup>

      </div>


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
          {/* <br /> */}
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
        <Stack direction="row" spacing={2} style={{justifyContent: 'center'}} sx={{margin:"1rem"}}>
          <Button variant="contained" color="secondary" sx={{color:"white"}} href="/main" >Prev</Button>
          {/* <Button variant="outlined" href="/music/{musicId}/challenge/{userId}">Prev</Button> */}
          <Button variant="contained" color="secondary" onClick={uploadToServer}  sx={{color:"white"}} >   Upload     </Button>
          {/* <Button variant="contained" color="secondary" onClick={uploadToServer} sx={{color:"white"}} href="/mypage" >   Upload     </Button> */}
          {/* <Button variant="outlined" href="/video/{선택한비디오아이디}/{이전페이지}/{로그인한유저아이디}">   Upload     </Button> */}
        </Stack>

      {/* <button>back</button>
      <button onClick={uploadToServer}>uploadrrrr</button> */}
      {/* <button>upload</button> */}

      </div>
    </div>
  );
}

export default UpLoad;
