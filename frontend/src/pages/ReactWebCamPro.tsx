// import React from 'react';

// const FACING_MODE_USER = "user";
// const FACING_MODE_ENVIRONMENT = "environment";

// const videoConstraints = {
//   facingMode: FACING_MODE_USER
// };

// const WebcamCapture = () => {
//   const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

//   const handleClick = React.useCallback(() => {
//     setFacingMode(
//       prevState =>
//         prevState === FACING_MODE_USER
//           ? FACING_MODE_ENVIRONMENT
//           : FACING_MODE_USER
//     );
//   }, []);

//   return (
//     <>
//       <button onClick={handleClick}>Switch camera</button>
//       <Webcam
//         audio={false}
//         screenshotFormat="image/jpeg"
//         videoConstraints={{
//           ...videoConstraints,
//           facingMode
//         }}
//       />
//     </>
//   );
// };

// export default WebcamCapture

import React, { useRef } from "react";

const CONSTRAINTS = { video: true };

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const startVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
    if (videoRef && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = stream;
    }
  };

  return (
    <iframe src="https://my-website.com/page-with-webcam" allow="camera; microphone;"/>
  );
}

export default App;
