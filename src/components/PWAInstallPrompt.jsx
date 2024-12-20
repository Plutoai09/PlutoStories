import React, { useState, useEffect } from 'react';

const PWAInstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the prompt modal
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // Clear the deferredPrompt variable
    setDeferredPrompt(null);
    // Hide the prompt
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#0a192f] rounded-2xl p-6 max-w-sm w-full border border-[#64ffda] shadow-xl">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-[#1d3557] rounded-full flex items-center justify-center">
            <img 
              src="/images/star.webp" 
              alt="App Icon" 
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">Install Pluto Sleep</h3>
            <p className="text-sm text-gray-300">
              Install our app for a better experience with quick access and offline features
            </p>
          </div>

          <div className="flex flex-col w-full gap-3">
            <button
              onClick={handleInstallClick}
              className="w-full py-3 px-4 bg-[#64ffda] text-[#0a192f] rounded-lg font-medium hover:bg-[#4cd5b5] transition-colors"
            >
              Install App
            </button>
            <button
              onClick={() => setShowPrompt(false)}
              className="w-full py-3 px-4 bg-transparent text-[#64ffda] border border-[#64ffda] rounded-lg font-medium hover:bg-[#64ffda] hover:bg-opacity-10 transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;