import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppLaunch = () => {
  const navigate = useNavigate();

  const handleLaunchApp = () => {
    // Try to launch the installed PWA
    const manifestUrl = document.querySelector('link[rel="manifest"]')?.href;
    if (manifestUrl) {
      window.location.href = manifestUrl;
    }
  };

  const handleContinueToWebsite = () => {
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-[#0a192f] flex items-center justify-center p-4">
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
            <h3 className="text-xl font-semibold text-white">Launch Pluto Sleep</h3>
            <p className="text-sm text-gray-300">
              Your app has been installed successfully! Choose how you'd like to continue.
            </p>
          </div>

          <div className="flex flex-col w-full gap-3">
            <button
              onClick={handleLaunchApp}
              className="w-full py-3 px-4 bg-[#64ffda] text-[#0a192f] rounded-lg font-medium hover:bg-[#4cd5b5] transition-colors"
            >
              Launch App
            </button>
            <button
              onClick={handleContinueToWebsite}
              className="w-full py-3 px-4 bg-transparent text-[#64ffda] border border-[#64ffda] rounded-lg font-medium hover:bg-[#64ffda] hover:bg-opacity-10 transition-colors"
            >
              Continue to Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLaunch;