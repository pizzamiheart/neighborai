import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Phone() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('');

  async function handleCall() {
    if (!phoneNumber) {
      setStatus('Please enter a phone number.');
      return;
    }
    
    setStatus('Initiating call...');
    
    try {
      const response = await fetch('/api/initiate-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phoneNumber }),
      });
      const result = await response.json();
      if (result.success) {
        setStatus('Call initiated successfully! You should receive a call shortly.');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('An error occurred. Please try again.');
    }
  }

  return (
    <div>
      <Head>
        <title>Neighbor - Call Your Tech Assistant</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <style jsx global>{`
        /* Add all the styles from the original HTML here */
      `}</style>
      <header>
        <nav>
          <ul>
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/chatbot"><a>Chat with AI</a></Link></li>
            <li><Link href="/phone"><a>Speak Live</a></Link></li>
          </ul>
        </nav>
      </header>
      <h1>Neighbor</h1>
      <h2>Call Your Tech Assistant</h2>
      <p>Enter your phone number and click the phone to start a call</p>
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter your phone number"
        required
      />
      <div className="phone-container">
        <div id="phone-emoji" onClick={handleCall}>📞</div>
        <button id="call-button" onClick={handleCall}>Call Your Neighbor</button>
      </div>
      <p id="status">{status}</p>
      <div className="explanation-box">
        <p>
          Get live help with your tech issues from an infinitely patient and always-around assistant! 
          We can help with things like resetting your Wi-Fi, speeding up your computer, 
          updating your smartphone, and managing cloud storage.
        </p>
      </div>
    </div>
  );
}