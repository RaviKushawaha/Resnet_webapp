import React, { useState } from 'react';
import WebcamCapture from './WebcamCapture';

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [imageText, setImageText] = useState('');

  const handleImageChange = (e) => {
    // e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

//   const handleImageChange = (e) => {
//     const files = e.target.files;
//     if (files && files[0]) {
//       setFile(files[0]);
//       console.log(files[0]); // Log the selected file to the console
//     }
//   };


    const handleWebcamImage = (imageSrc) => {
    // Convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (imageSrc.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(imageSrc.split(',')[1]);
    else
      byteString = unescape(imageSrc.split(',')[1]);

    // Write the bytes of the string to an ArrayBuffer
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // Create a blob from the ArrayBuffer
    let blob = new Blob([ab], { type: 'image/jpeg' });
    // Create a file from the blob
    const file = new File([blob], "webcam-image.jpg", { type: 'image/jpeg' });

    setFile(file);
    setImagePreviewUrl(imageSrc); // Display the image captured from the webcam
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    // Update this URL to match your Django backend endpoint
    const uploadURL = 'http://localhost:8425/upload/';

    try {
      const response = await fetch(uploadURL, {
        method: 'POST',
        body: formData,
        // Include headers if your Django backend requires them (e.g., for CSRF token)
        // headers: { 'X-CSRFToken': 'yourCsrfToken' },
      });
      
      if (response.ok) {
        const data = await response.json();
        // setImageText(`Image uploaded successfully: ${data.imageUrl}`);
        setImageText(`${data.image_text}`);
        // Update the component state based on the response
      } else {
        alert('Failed to upload image');
      }
    //   const result = await response.json();
    //   console.log('Success:', result);
    } catch (error) {
      console.error('Error during image upload:', error);
      alert('An error occurred, please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Upload Image</button>
      </form>
      <WebcamCapture onCapture={handleWebcamImage} />
      {imagePreviewUrl && (
        <div>
          <img src={imagePreviewUrl} alt="Upload Preview" style={{ maxWidth: '25%' }} />
          <p>{imageText}</p>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
