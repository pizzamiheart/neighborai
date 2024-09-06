import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Welcome to Neighbor - Your Tech Support Assistant</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <style jsx global>{`
        body {
          font-family: Arial, sans-serif;
          font-size: 20px;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #f0f2f5;
        }
        h1 {
          color: #4267B2;
          text-align: center;
          font-size: 36px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        p {
          text-align: center;
          font-size: 24px;
          margin-bottom: 30px;
        }
        .choice-container {
          display: flex;
          justify-content: center;
          gap: 20px;
        }
        .choice-button {
          padding: 15px 30px;
          font-size: 24px;
          background-color: #4267B2;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .choice-button:hover {
          background-color: #365899;
        }
      `}</style>
      <h1>Welcome to Neighbor - Your Tech Support Assistant</h1>
      <p>How would you like to get help today?</p>
      <div className="choice-container">
        <Link href="/chatbot">
          <a className="choice-button">Chat with AI</a>
        </Link>
        <Link href="/phone">
          <a className="choice-button">Speak Live</a>
        </Link>
      </div>
    </div>
  );
}