import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Create a global variable to store the deferred prompt
window.deferredPrompt = null;

// Listen for beforeinstallprompt before anything else


// Register service worker after page load
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });
      console.log('ServiceWorker registration successful:', registration.scope);
    } catch (err) {
      console.error('ServiceWorker registration failed:', err);
    }
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)