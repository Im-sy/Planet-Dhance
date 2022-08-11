import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useReactMediaRecorder } from "react-media-recorder";

const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return <video ref={videoRef} width={500} height={500} autoPlay controls />;
};

const RecordView = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true });


    async function sendBlob(){
      let blob = await fetch(mediaBlobUrl).then(r => r.blob());
      console.log(blob);
      // const blob = new Blob([mediaBlobUrl], { type: 'video/webm' })
      // console.log(blob);
      
      
      let file = new File([blob], 'video.webm');
      let formData = new FormData();
      formData.append("inputFile", file, "fnw4123euf.webm");
      // formData.append("inputFile", mediaBlobUrl);
      console.log(file);
      
      
      axios
        .post("http://i7d201.p.ssafy.io:8081/file/upload", formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          alert("실패");
          console.log(err)
        });
    }

  return (
    <div>
      <p>{status}</p>
      
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      {/* <video src={mediaBlobUrl} controls autoPlay loop /> */}
      <button onClick={sendBlob}>Send</button>
    </div>
  );
};


export default RecordView