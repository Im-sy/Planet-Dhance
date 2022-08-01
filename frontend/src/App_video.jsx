import React, { useRef, useEffect, useState } from 'react';
import videoFile from './videos/IMG_0960.mp4';
let blob = fetch(videoFile).then((r) => r.blob());
const videoZone = {
  position: 'relative',
  height: '500px',
};
export default function App() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [dimensions, setDimensions] = useState({});
  const [thumbnail, setThumbnail] = useState([]);

  let context;
  if (canvasRef.current) {
    context = canvasRef.current.getContext('2d');
  }

  function getVideoSizeData(videoRef) {
    const ratio = videoRef.current.videoWidth / videoRef.current.videoHeight;
    const w = 500;
    const h = 800;
    return {
      ratio,
      w,
      h,
    };
  }

  useEffect(() => {
    // Add listener when the video is actually available for
    // the browser to be able to check the dimensions of the video.
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', function () {
        const { w, h } = getVideoSizeData(videoRef);
        console.log((videoRef.currentTime = '5'));
        canvasRef.current.width = w;
        canvasRef.current.height = h;
        videoRef.currentTime = 6;
        setDimensions({
          w: w,
          h: h,
        });
      });
    }
    blob.then(function (myBlob) {
      //sacve test
      const objectURL = URL.createObjectURL(myBlob);
      const a = document.createElement('a');
      a.download = 'testFile';
      a.click();
    });
    // var file = new File([blob], "name");
    // console.log(file);
  }, []);

  function snap() {
    if (context && videoRef.current) {
      const video = document.querySelector('video');
      console.log(video);
      video.currentTime = 6;
      context.fillRect(0, 0, dimensions.w, dimensions.h);
      context.drawImage(videoRef.current, 0, 0, dimensions.w, dimensions.h);
      // save
      const canvasHTML = document.querySelector('canvas');
      const imgURL = canvasHTML.toDataURL('image/png');
      setThumbnail([...thumbnail, imgURL]);
      console.log(thumbnail);
    }
  }

  return (
    <div style={videoZone}>
      <video src={videoFile} ref={videoRef} height="500" muted controls />
      <canvas crossOrigin="anonymous" ref={canvasRef} />
      <button onClick={snap}>Take screenshot</button>
      {thumbnail.map((imgBlobs, index) => {
        console.log('hello');
        return <img key={index} src={imgBlobs} />;
      })}
    </div>
  );
}
