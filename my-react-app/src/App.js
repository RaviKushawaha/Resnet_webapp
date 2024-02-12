import logo from './logo.svg';
import './App.css';
import React from 'react';
import ImageUpload from './ImageUpload';
import ImagePredList from './ImagePredList';


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
  
  return (
    <>
    <div className="App">
      <h1>Upload Image to Django Backend</h1>
      <ImageUpload />
    </div>
    </>
  );
}

export default App;
