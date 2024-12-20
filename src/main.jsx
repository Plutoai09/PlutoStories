// Add this code at the top with your other imports in main.jsx

// Your existing imports remain the same
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// ... other imports

// Add the service worker registration code
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

// Your existing render code remains the same
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)