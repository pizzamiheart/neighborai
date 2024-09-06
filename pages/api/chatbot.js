import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  async function fetchResponse(message) {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        setMessages(prev => [...prev, { sender: 'Neighbor', content: result.message }]);
      } else {
        throw new Error(result.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { sender: 'Neighbor', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsGenerating(false);
    }
  }

  function handlePromptClick(prompt) {
    if (isGenerating) {
      alert("Just a moment while we finish your other question :)");
      return;
    }
    setIsGenerating(true);
    setInputMessage(prompt);
    sendMessage(prompt);
  }

  function sendMessage(message = inputMessage) {
    if (message.trim()) {
      setMessages(prev => [...prev, { sender: 'You', content: message }]);
      fetchResponse(message);
      setInputMessage('');
    }
  }

  return (
    <div>
      <Head>
        <title>Neighbor - Your Friendly Tech Assistant</title>
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
      <h2>Your Friendly Tech Assistant</h2>
      <div className="chat-container">
        <div className="common-issues">
          <h3>Common Issues</h3>
          <button onClick={() => handlePromptClick("How do I reset my Wi-Fi router?")}>Reset Wi-Fi Router</button>
          <button onClick={() => handlePromptClick("My computer is running slow. What can I do?")}>Slow Computer</button>
          <button onClick={() => handlePromptClick("How do I update my smartphone's operating system?")}>Update Smartphone</button>
          <button onClick={() => handlePromptClick("I'm running out of iCloud storage. What should I do?")}>iCloud Storage</button>
        </div>
        <div className="chat-box">
          <div id="chat-messages">
            {messages.map((msg, index) => (
              <div key={index}><strong>{msg.sender}:</strong> {msg.content}</div>
            ))}
          </div>
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your question here..."
            rows="3"
          />
          <button onClick={() => sendMessage()}>Send</button>
          <button onClick={() => setMessages([])}>Clear Chat</button>
        </div>
      </div>
    </div>
  );
}