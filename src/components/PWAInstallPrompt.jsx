import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PWAInstallPage = () => {
  const [showPrompt, setShowPrompt] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    // Handle standalone mode detection
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone 
      || document.referrer.includes('android-app://');

   

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Listen for successful installation
    window.addEventListener('appinstalled', () => {
      navigate('/onboarding');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [navigate]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // If no deferred prompt but on mobile, might be iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      
      if (isIOS) {
        // Show iOS-specific instructions if needed
        alert('To install: tap the share button below and select "Add to Home Screen"');
      }
      
      // Navigate anyway after a short delay
      setTimeout(() => {
        navigate('/onboarding');
      }, 2000);
      return;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      setDeferredPrompt(null);
      setShowPrompt(false);
      
      // Navigate regardless of the outcome
      navigate('/onboarding');
    } catch (error) {
      console.error('Installation error:', error);
      // Navigate anyway if there's an error
      navigate('/onboarding');
    }
  };

  const handleMaybeLater = () => {
    setShowPrompt(false);
    navigate('/onboarding');
  };

  // Check if it's iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

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
            <h3 className="text-xl font-semibold text-white">Install Pluto Sleep</h3>
            <p className="text-sm text-gray-300">
              Install our app for a better experience with quick access and offline features
            </p>
            {isIOS && (
              <p className="text-xs text-gray-400 mt-2">
                Tap the share button and select "Add to Home Screen"
              </p>
            )}
          </div>

          <div className="flex flex-col w-full gap-3">
            <button
              onClick={handleInstallClick}
              className="w-full py-3 px-4 bg-[#64ffda] text-[#0a192f] rounded-lg font-medium hover:bg-[#4cd5b5] transition-colors"
            >
              Install App
            </button>
            <button
              onClick={handleMaybeLater}
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

export default PWAInstallPage;