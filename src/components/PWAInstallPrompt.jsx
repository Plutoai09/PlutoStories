import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PWAInstallPage = () => {
  const [showPrompt, setShowPrompt] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallReady, setIsInstallReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already installed
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone 
      || document.referrer.includes('android-app://');

    if (isInstalled) {
      navigate('/onboarding');
      return;
    }

    // Check for existing prompt first
    if (window.deferredPrompt) {
      setDeferredPrompt(window.deferredPrompt);
      setIsInstallReady(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallReady(true);
      window.deferredPrompt = e;  // Store it globally as well
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    window.addEventListener('appinstalled', () => {
      setDeferredPrompt(null);
      setIsInstallReady(false);
      window.deferredPrompt = null;  // Clear the global prompt
      navigate('/onboarding');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [navigate]);

  const handleInstallClick = async () => {
    if (!isInstallReady && !deferredPrompt) {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      
      if (isIOS) {
        alert('To install: tap the share button below and select "Add to Home Screen"');
      }
      
      setTimeout(() => {
        navigate('/onboarding');
      }, 2000);
      return;
    }

    try {
      const promptEvent = deferredPrompt || window.deferredPrompt;
      if (promptEvent) {
        await promptEvent.prompt();
        const { outcome } = await promptEvent.userChoice;
        console.log('Install prompt outcome:', outcome);
        
        // Clear the prompt
        setDeferredPrompt(null);
        window.deferredPrompt = null;
        setIsInstallReady(false);
        setShowPrompt(false);
      }
      
      // Always navigate after handling the prompt
      navigate('/onboarding');
    } catch (error) {
      console.error('Installation error:', error);
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