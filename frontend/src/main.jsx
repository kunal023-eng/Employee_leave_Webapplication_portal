// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter as Router } from 'react-router-dom';

// import store from './store/store.js'
// import { Provider } from 'react-redux'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={store}>
//       <Router>
//         <App/>
//       </Router>
//     </Provider>
//   </StrictMode>,
// )

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './store/store.js'; // Import the store configuration
import { Provider } from 'react-redux'; // Import the Provider component to integrate Redux store

// Create the root element and render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap the entire app with Provider to make Redux store available to the app */}
    <Provider store={store}>
      {/* Wrap the app in Router for routing functionality */}
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>
);
