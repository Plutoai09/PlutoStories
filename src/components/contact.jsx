import React from 'react';

const contact = () => {
  const cardStyle = {
    width: '100%',
    height: '800px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle = {
    padding: '16px',
    borderBottom: '1px solid #e0e0e0',
    fontWeight: 'bold',
    fontSize: '1.25rem'
  };

  const iframeContainerStyle = {
    flex: 1,
    padding: '0'
  };

  const iframeStyle = {
    width: '100%',
    height: '100%',
    border: 'none'
  };

  return (
    <div style={cardStyle}>
     
      <div style={iframeContainerStyle}>
        <iframe 
          src="https://getpluto.in/trouble" 
          style={iframeStyle}
          title="Pluto Website"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default contact;