import { useEffect } from "react";
import * as tmPose from '@teachablemachine/pose';
import song from "./static/30/chart.json";
// import song from "../../public/teachable/temp1.json";
// import testImg from "https://cdn.pixabay.com/photo/2022/07/27/07/37/thistle-7347371__340.jpg"
import * as tf from '@tensorflow/tfjs';
// import * as tmPose from '@teachablemachine/pose';
// require('@tensorflow');
// require('@tensorflow-models');

// const script1 = document.createElement("script");
// script1.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js";
// script1.async = true;
// document.body.appendChild(script1);

// const script2 = document.createElement("script");
// script2.src = "https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8/dist/teachablemachine-pose.min.js";
// script2.async = true;
// document.body.appendChild(script2);

// const script3 = document.createElement("script");
// script3.src = "https://code.jquery.com/jquery-1.12.4.min.js";
// script3.async = true;
// document.body.appendChild(script3);



export default function Teachable () {

  const URL = "./teachable/my_model/";
  let model : any
  let webcam : any
  let ctx :any 
  let labelContainer :any 
  let maxPredictions :any  

  let startTime :any ;
  let countup :any ; // 1 = 0.1초
  let nextNote :any ;
  let max : number ;
  // let song ;

  async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    //TODO 이 친구를 선택한 곡에 맞게
    // const songURL = "./temp1.json";
    // // 보면 JSON
    // await $.getJSON(songURL, (data) => {
    //   song = data;
    // });
    // console.log('song is ', song)


    nextNote = song.notes[song.next];
    max = 0;

    // init 시간 설정
    startTime = Date.now();
    startTimer(song.duration); // temp1에서

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 200;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip  // webcam
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    
    // append/get elements to the DOM
    const canvas : any = document.getElementById("canvas");
    canvas.width = size;
    canvas.height = size;
    ctx = canvas.getContext("2d");
    
    labelContainer = document.getElementById("label-container");

    console.log('maxPredictions',maxPredictions)
    for (let i = 0; i < maxPredictions; i++) {
      // and class labels
      labelContainer.appendChild(document.createElement("div"));
    }
  }

  const startTimer = function (duration : number) {
    const display : any = document.querySelector(".summary__timer");
    const timer = duration;
    // var minutes;
    // var seconds;
    countup = 0;

    display.style.display = "block";
    display.style.opacity = 1;

    const songDurationInterval = setInterval(function () {
      display.innerHTML = countup;

      if (++countup > timer) {
        clearInterval(songDurationInterval);
      }
    }, 100);
  };

  async function loop() {
    webcam.update(); // update the webcam frame
    // console.log('webcam is ', webcam)
    // console.log(ctx)
    // console.log(webcam)

    await predict();
    window.requestAnimationFrame(loop);
  }

  async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    // console.log('webcam.canvas : ',webcam.canvas)
    // const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    const { pose, posenetOutput } = await model.estimatePose(ctx.canvas);
    // console.log('posenetOutput :', posenetOutput)
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);
    console.log(prediction)
    if (nextNote != null) {
      if (
        countup >= nextNote.delay &&
        countup < nextNote.delay + nextNote.duration
      ) {
        //   console.log(countup);
        //   console.log(prediction);

        //이 안에서 판정
        //prediction[i].className==nextNote.type 일때
        //prediction[i].probability가 일정 점수 이상이면 판정
        //일정 점수 0.9 이상: perfect, 0.9~0.5: good, 0.5~: miss

        for (let i = 0; i < maxPredictions; i++) {
          if (
            prediction[i].className == nextNote.type &&
            max < prediction[i].probability
          ) {
            max = prediction[i].probability;
          }
        }

        // max가 perfect이면 nextNote로 넘어감
        if (max >= 0.9) {
          showEffect(max);
          song.next++;
          nextNote = song.notes[song.next];
          max = 0.0;
        }
      } else if (countup == nextNote.delay + nextNote.duration) {
        //miss인지 good인지 판단
        showEffect(max);
        song.next++;
        nextNote = song.notes[song.next];
        max = 0.0;
      }
    }
   
    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    // finally draw the poses
    drawPose();
  }

  function drawPose() {
    if (webcam.canvas) {
      ctx.drawImage(webcam.canvas, 0, 0);
      // draw the keypoints and skeleton
      // if (pose) {
      //     const minPartConfidence = 0.5;
      //     tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
      //     tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      // }
    }
  }

  function showEffect(rate : number) {
    //rate(perfect:1.0~0.9,good:0.9~0.5,miss:0.5~0.0)에 따라 이모티콘 피드백 표시
    //한 판정 내에 여러개 이모티콘 있고 랜덤으로 표시해주면 좋겠다....
    //프론트 분들 부탁합니다....ㅎㅎㅎ
    console.log(nextNote.type, rate);
  }


  return (
    <div>
    <div>Teachable Machine Pose Model</div>
    <button type="button" onClick={init}>Start</button>
    <div className="summary__timer"></div>
    <div><canvas id="canvas"></canvas></div>
    <div id="label-container"></div>
  </div>

  )

}



  /* 작동원리 
    1. canvas tag를 가져와서, ctx = canvas.getContext("2d")
    2. 웹캠 생성 : webcam = new tmPose.Webcam(size, size, flip);
    
    3. ctx.drawImage(webcam.canvas, 0, 0); 로 그려주기


    */

    /*
  1. init() 함수에서
    : async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json"; 로 model 가져오기



  2. model = await tmPose.load(modelURL, metadataURL); 로 model 생성
    maxPredictions = model.getTotalClasses();

  3. predict() 함수에서 webcam.canvas에서 pose와 posenetOutput 가져오기 & 예측
    :  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);  <- webcam.canvas만 바꿔주면 될듯!
       const prediction = await model.predict(posenetOutput);

  4. ctx에 drawImage로 webcam.canvas 그려주기 => canvas tag에서 실시간으로 보임 : 웹캠 있으면, 이 부분 없어도 됨!

*/


