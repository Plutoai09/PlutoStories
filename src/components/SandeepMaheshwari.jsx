import React, { useEffect, useState } from 'react';

const SandeepMaheshwari = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Create the Delphi configuration script
    const delphiPageScript = document.createElement('script');
    delphiPageScript.id = 'delphi-page-script';
    delphiPageScript.innerHTML = `
      window.delphi = {...(window.delphi ?? {})};
      window.delphi.page = {
        config: "62c8cc36-65c2-452e-9161-acccf764ebb4",
        overrides: {
          landingPage: "OVERVIEW",
        },
        container: {
          width: "100%",
          height: "90vh",
        },
      };
    `;
    document.body.appendChild(delphiPageScript);

    // Create the Delphi bootstrap script
    const delphiBootstrapScript = document.createElement('script');
    delphiBootstrapScript.id = 'delphi-page-bootstrap';
    delphiBootstrapScript.src = "https://embed.delphi.ai/loader.js";
    
    // Add load and error event listeners to handle loading state
    delphiBootstrapScript.onload = () => {
      setIsLoading(false);
    };
    delphiBootstrapScript.onerror = () => {
      setIsLoading(false);
      console.error('Failed to load Delphi script');
    };

    document.body.appendChild(delphiBootstrapScript);

    // Cleanup function to remove scripts when component unmounts
    return () => {
      const existingPageScript = document.getElementById('delphi-page-script');
      const existingBootstrapScript = document.getElementById('delphi-page-bootstrap');

      if (existingPageScript) {
        document.body.removeChild(existingPageScript);
      }

      if (existingBootstrapScript) {
        document.body.removeChild(existingBootstrapScript);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  if (isLoading) {
    return (
      <div 
        style={{ 
          width: '100%', 
          height: '90vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          backgroundColor: '#f0f0f0' 
        }}
      >
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <div 
            style={{
              width: '50px',
              height: '50px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          />
          <p style={{ marginTop: '15px', color: '#333' }}>
            Loading Sandeep AI...
          </p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div 
      id="delphi-container" 
      style={{ 
        width: '100%', 
        height: '90vh' 
      }} 
    />
  );
};

export default SandeepMaheshwari;