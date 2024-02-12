import logo from './logo.svg';
import './App.css';
import React from 'react';
import ImageUpload from './ImageUpload';
import ImagePredList from './ImagePredList';
import backgroundImage from './background_images/pngtree-green-plain-png-image_2422971.jpeg'; // Make sure the path is correct


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  // Style object for background image
  const appStyle = {
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover', // Cover the entire page
    backgroundPosition: 'center', // Center the background image
  };
  return (
    <>
    <div className="App" style={appStyle}>
      <h1>Upload Image to Django Backend</h1>
      <ImageUpload />
    </div>
    </>
  );
}

export default App;
