import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PaymentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #00000;
`;

const PaymentCard = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
`;

const PaymentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const BackIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 auto;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 4px;
  text-align: left;
`;

const InputContainer = styled.div`
  margin-bottom: 16px;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ error, index }) => (error ? 'red' : index === 0 ? '#dae7fc' : '#ccc')};
  background-color: ${({ index }) => (index === 0 ? '#fcfdff' : '#f8f8f8')};
  border-radius: 4px;
  font-size: 14px;
`;

const PaymentIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 76px;
  height: 36px;
  margin: 0 8px;
`;

const IconImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const PayButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const LoadingMessage = styled.div`
  text-align: center;
  margin-bottom: 16px;
  color: #666;
  font-size: 14px;
`;

const RedirectLink = styled.a`
  color: #000;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 4px;
`;

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [amount, setAmount] = useState(89);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Load Meta Pixel and Google Tag Manager on component mount
  useEffect(() => {
    // Load Meta Pixel script
    const metaPixelScript = document.createElement('script');
    metaPixelScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '552055977545898');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(metaPixelScript);

    // Add Meta Pixel no-script image
    const metaPixelNoscript = document.createElement('noscript');
    metaPixelNoscript.innerHTML = `
      <img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=552055977545898&ev=PageView&noscript=1"
      />
    `;
    document.body.appendChild(metaPixelNoscript);

    // Load Google Tag Manager script
    const googleTagScript = document.createElement('script');
    googleTagScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-16640961970';
    googleTagScript.async = true;
    document.head.appendChild(googleTagScript);

    const googleTagManagerScript = document.createElement('script');
    googleTagManagerScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-16640961970');
    `;
    document.head.appendChild(googleTagManagerScript);

    // Cleanup function
    return () => {
      document.head.removeChild(metaPixelScript);
      document.body.removeChild(metaPixelNoscript);
      document.head.removeChild(googleTagScript);
      document.head.removeChild(googleTagManagerScript);
    };
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(String(phone));
  };

  const handleBack = () => {
    window.location.href = 'https://getpluto.in/artofconversation/payment';
  };

  const validateForm = () => {
    let isValid = true;

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate phone
    if (!phone) {
      setPhoneError('Phone number is required');
      isValid = false;
    } else if (!validatePhone(phone)) {
      setPhoneError('Please enter a valid 10-digit phone number');
      isValid = false;
    } else {
      setPhoneError('');
    }

    return isValid;
  };

  const handlePayment = async () => {
    // Validate form
    if (!validateForm()) {
      return;
    }

    // Track InitiateCheckout event
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        value: 89,
        currency: 'INR',
        content_type: 'product'
      });
    }

    // Track Google Tag Manager event
    if (window.gtag) {
      window.gtag('event', 'begin_checkout', {
        'value': 89,
        'currency': 'INR'
      });
    }

    setLoading(true);

    try {
      // Load Razorpay script
      const res = await loadRazorpayScript();
      if (!res) {
        alert('Razorpay SDK failed to load');
        setLoading(false);
        return;
      }

      // Create order via your backend
      const { data } = await axios.post('https://contractus.co.in/api/create-order', {
        amount: 8900, // Amount in paise (e.g., 1000 paise = ₹10)
        currency: 'INR'
      });

      const options = {
        key: 'rzp_live_gC8XrdngTZTdd8', // Replace with your Razorpay Key ID
        amount: data.amount,
        currency: data.currency,
        name: 'Pluto',
        description: 'Art of Conversation',
        image: '/public/logo.png',
        order_id: data.id,
        handler: async (response) => {
          // Track Purchase event for Meta Pixel
          if (window.fbq) {
            window.fbq('track', 'Purchase', {
              value: 89,
              currency: 'INR',
              content_type: 'product'
            });
          }

          // Track Purchase event for Google Tag Manager
          if (window.gtag) {
            window.gtag('event', 'purchase', {
              'transaction_id': response.razorpay_order_id,
              'value': 89,
              'currency': 'INR'
            });
          }

          // Set verifying state after payment
          setLoading(false);
          setVerifying(true);

          try {
            // Verify payment on your backend
            const verifyResponse = await axios.post(
              'https://contractus.co.in/api/verify-payment',
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verifyResponse.data.success) {
              // Create Razorpay customer after successful payment verification
              try {
                const customerResponse = await axios.post(
                  'https://contractus.co.in/api/create-customer',
                  {
                    email: email,
                    contact: phone,
                    payment_id: response.razorpay_payment_id,
                    order_id: response.razorpay_order_id
                  }
                );

                // Redirect to login after successful customer creation
                window.location.href = 'https://getpluto.in/success';
              } catch (customerError) {
                console.error('Customer Creation Error:', customerError);
                alert('Payment Successful, but Customer Creation Failed');
                window.location.href = 'https://getpluto.in/success'; // Still redirect even if customer creation fails
              }
            } else {
              alert('Payment Verification Failed');
              setVerifying(false);
            }
          } catch (error) {
            alert('Payment Verification Error');
            console.error(error);
            setVerifying(false);
          }
        },
        prefill: {
          email: email,
          contact: phone,
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#000',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      alert('Error initiating payment');
      console.error(error);
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Placeholder for actual icon paths
  const paymentIcons = [
    { src: '/images/icon1.webp', alt: 'Visa' },
    { src: '/images/icon2.png', alt: 'Mastercard' },
    { src: '/images/icon3.webp', alt: 'American Express' },
    { src: '/images/icon4.svg', alt: 'American Express' }
  ];

  return (
    <PaymentContainer>
      <PaymentCard>
        {verifying && (
          <LoadingMessage>
            You will be redirected soon, if not 
            <RedirectLink href="https://getpluto.in/success">
              click here
            </RedirectLink>
          </LoadingMessage>
        )}
        
        <PaymentHeader>
          <BackButton onClick={handleBack}>
            <BackIcon src="/images/back.svg" alt="Back" />
          </BackButton>
          <Title>Payment Details</Title>
        </PaymentHeader>
        
        <InputContainer>
          <InputLabel>Amount</InputLabel>
          <InputField value={`₹${amount}.00`} disabled index={0} />
        </InputContainer>
        
        <InputContainer>
          <InputLabel>Email</InputLabel>
          <InputField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            error={!!emailError}
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </InputContainer>
        
        <InputContainer>
          <InputLabel>Phone</InputLabel>
          <InputField
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            error={!!phoneError}
          />
          {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}
        </InputContainer>
        
        <PaymentIcons>
          {paymentIcons.map((icon, index) => (
            <IconWrapper key={index}>
              <IconImage src={icon.src} alt={icon.alt} />
            </IconWrapper>
          ))}
        </PaymentIcons>
        
        <PayButton  disabled={loading} onClick={handlePayment}>
          {loading ? 'Processing...' : `Pay ₹${amount}.00`}
        </PayButton>
      </PaymentCard>
    </PaymentContainer>
  );
};

export default Checkout;