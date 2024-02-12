// WebcamCapture.js
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import './WebcamCapture.css'; // Make sure to create this CSS file and import it here

const WebcamCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  };

  return (
    <div className="webcam-capture-container">
      {isWebcamActive && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          screenshotQuality={1}
          style={{ width: '25%', marginBottom: '10px' }} // Adjusted for full width and margin
        />
      )}

      <div className="buttons-container">
        {!isWebcamActive ? (
          <button onClick={() => setIsWebcamActive(true)}>Start Webcam</button>
        ) : (
          <>
            <button onClick={capture}>Capture Photo</button>
            <button onClick={() => setIsWebcamActive(false)}>Stop Webcam</button>
          </>
        )}
      </div>
    </div>
  );
};

export default WebcamCapture;
