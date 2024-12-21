import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PWAInstallPage = () => {
  const [showPrompt, setShowPrompt] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallReady, setIsInstallReady] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if app is installed
    const checkInstallation = () => {
      const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches
        || window.navigator.standalone 
        || document.referrer.includes('android-app://');

      setIsInstalled(isAppInstalled);
      
      if (isAppInstalled) {
        launchInstalledApp();
      }
    };

    // Initial check
    checkInstallation();

    // Listen for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.addListener(checkInstallation);

    // Check for existing prompt
    if (window.deferredPrompt) {
      setDeferredPrompt(window.deferredPrompt);
      setIsInstallReady(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallReady(true);
      window.deferredPrompt = e;
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsInstallReady(false);
      window.deferredPrompt = null;
      setIsInstalled(true);
      launchInstalledApp();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      mediaQuery.removeListener(checkInstallation);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [navigate]);

  const launchInstalledApp = () => {
    // Try to launch the installed PWA
    if (window.navigator.standalone || document.referrer.includes('android-app://')) {
      // Already in standalone mode, navigate to home
      navigate('/onboarding');
    } else {
      // Try to launch the installed PWA using the manifest's start_url
      const manifestUrl = document.querySelector('link[rel="manifest"]')?.href;
      if (manifestUrl) {
        fetch(manifestUrl)
          .then(response => response.json())
          .then(manifest => {
            const startUrl = new URL(manifest.start_url || '/', window.location.origin);
            window.location.href = startUrl.href;
          })
          .catch(() => {
            // Fallback to opening in current window
            navigate('/onboarding');
          });
      } else {
        navigate('/onboarding');
      }
    }
  };

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
        
        if (outcome === 'accepted') {
          // Wait for the app to be installed
          setDeferredPrompt(null);
          window.deferredPrompt = null;
          setIsInstallReady(false);
          setShowPrompt(false);
          // The appinstalled event will handle launching the app
        } else {
          // If user declined, navigate to onboarding
          navigate('/onboarding');
        }
      }
    } catch (error) {
      console.error('Installation error:', error);
      navigate('/onboarding');
    }
  };

  const handleMaybeLater = () => {
    setShowPrompt(false);
    navigate('/onboarding');
  };

  // If app is already installed, try to launch it immediately
  useEffect(() => {
    if (isInstalled) {
      launchInstalledApp();
    }
  }, [isInstalled]);

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // If app is installed, show loading or redirect immediately
  if (isInstalled) {
    return (
      <div className="min-h-screen bg-[#0a192f] flex items-center justify-center p-4">
        <div className="text-white text-center">
          <p>Opening Pluto Sleep...</p>
        </div>
      </div>
    );
  }

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