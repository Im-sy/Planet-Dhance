import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React, { useRef, useEffect, useState } from 'react';
import { createContext } from 'vm';
import videoFile from '../videos/Patissiere_guide.mp4';



const videoZone : CSSProperties = {
  position: 'relative',
  height: '500px',
};


export default function Thumnail() {

  let videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>();  // context = canvasRef.current.getContext('2d'); error 제거
  const [dimensions, setDimensions] = useState<any>({});
  const [thumbnail, setThumbnail] = useState([]);

  let context : any;
  if (canvasRef.current) {
    context = canvasRef.current.getContext('2d');
  }
 
  function getVideoSizeData(videoRef: React.MutableRefObject<any> ) {
    const ratio = videoRef.current.videoWidth / videoRef.current.videoHeight;
    // const w = 500;
    // const h = 800;
    const w = videoRef.current.videoWidth;
    const h = videoRef.current.videoHeight;
    return {
      ratio,
      w,
      h,
    };
  }

  useEffect(() => {
    
    console.log('--------------------정상작동-----------')
    const video = document.querySelector('video')  // 추가
    videoRef.current = video                       //추가
    // videoRef.current.onloadedmetadata=alert("Meta data for video loaded");
    // Add listener when the video is actually available for
    // the browser to be able to check the dimensions of the video.
    if (videoRef.current) {
      console.log('if (videoRef.current) 통과')
      videoRef.current.addEventListener('loadedmetadata', function () {
        const { w, h } = getVideoSizeData(videoRef);
        canvasRef.current.width = w;
        canvasRef.current.height = h;
        console.log('w,h : ', w, h)
        setDimensions({
          w: w,
          h: h,
        });
      });
      
      setTimeout(snap, 5000) 
    }

  }, []);

  async function snap() {
    console.log('snap run');
    console.log('snap input time is : ',);
    console.log('context  : ', context);
    console.log('videoRef: ', videoRef);


      await context.fillRect(0, 0, dimensions.w, dimensions.h);
      await context.drawImage(
        videoRef.current,
        0,
        0,
        dimensions.w,
        dimensions.h
      );
      console.log('context2 : ', context);
      const canvasHTML = document.querySelector('canvas');
      const imgURL = canvasHTML.toDataURL('image/png');
      console.log([...thumbnail])
      setThumbnail([...thumbnail, imgURL]);
   
  }



  return ( 
    <div style={videoZone}>
      <video id='thumnail_video' src={videoFile} ref={videoRef} height="500" muted controls />
      {/* 썸네일 그려줌 */}
      <canvas id='canvas' ref={canvasRef} />   

      <button onClick={snap}>Take screenshot</button>
      {thumbnail.map((imgBlobs, index) => {
        return <img key={index} src={imgBlobs} />;
      })}
    </div>
  );
  


}
