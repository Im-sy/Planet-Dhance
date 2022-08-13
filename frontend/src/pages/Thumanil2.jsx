import { useRef, useState } from "react";
// import Thumbnail from "./Thumbnail";
// 1. Make sure user is uploading a video
// This is already checked in the Illfact videoupload

// 2. Do some testing before implementing it.
// 3. Yoau have to get the file URL with the Form Apped

export default function GetThumbnail() {
  const [file, setFile] = useState(null);
  const videoInput = useRef();
  const videoElem = useRef();
  const [imgSrc, setImgSrc] = useState();

  const videoChangeHandler = () => {
    console.log(videoInput.current.files[0]);
    setFile(videoInput.current.files[0]);
  };

  const captureThumbnail = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoElem.current.videoWidth;
    canvas.height = videoElem.current.videoHeight;

    canvas
      .getContext("2d")
      .drawImage(
        videoElem.current,
        0,
        0,
        videoElem.current.videoWidth,
        videoElem.current.videoHeight
      );

    setImgSrc(canvas.toDataURL(), "image.png");
    fetch(imgSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const NewFile = new File([blob], "video_thumbnail", {
          type: "image/png"
        });
        console.log(NewFile);
      });
  };

  return (
    <>
      <input
        ref={videoInput}
        // accept="video/mp4, video/mov"
        onChange={videoChangeHandler}
        type="file"
      />

      {file ? (
        <video
          id="video"
          className="w-100"
          ref={videoElem}
          src={URL.createObjectURL(file)}
          type="video/mp4"
          controls
        ></video>
      ) : (
        ""
      )}

      {imgSrc ? (
        <div>
          <img className="w-100" src={imgSrc} alt="" />
        </div>
      ) : (
        ""
      )}

      <button onClick={captureThumbnail}>Capture image</button>
    </>
  );
}
