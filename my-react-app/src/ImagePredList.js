import React from 'react';

const ImagePredList = ({ imagePred }) => {
  return (
    <div>
      {imagePred.map(([category, probability], index) => (
        <div key={index}>
          {`${category}: ${probability.toFixed(2)}%`}
        </div>
      ))}
    </div>
  );
};

export default ImagePredList;