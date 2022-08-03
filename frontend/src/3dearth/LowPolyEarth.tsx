import React from 'react'

export default function LowPolyEarth() {
  return (
    <div>
      <div className="sketchfab-embed-wrapper"
        style={{paddingTop: "100%"}}>
        {" "}
        <iframe
          style={{display: "block",
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%"}}
          title="Low Poly Earth"
          frameBorder="0"
          allowFullScreen
          // mozAllowFullScreen="true"
          // webkitAllowFullScreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking="true"
          execution-while-out-of-viewport="true"
          execution-while-not-rendered="true"
          web-share="true"
          src="https://sketchfab.com/models/69372c5dd5e54b8ebf1a5fc02a90748f/embed?autospin=1&autostart=1"
        >
          {" "}
        </iframe>{" "}
      </div>
    </div>
  );
}
