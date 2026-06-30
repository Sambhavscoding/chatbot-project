import { useState } from "react";
import { ChatInput } from "./components/ChatInput.jsx";
import ChatMessages from "./components/ChatMessages.jsx";
import "./App.css";

function App() {
  const [chatMessages, setChatMessages] = useState([
    {
      message: "hello ChatBot",
      sender: "user",
      id: "id1",
    },
    {
      message: "Hello! How can I help you?",
      sender: "robot",
      id: "id2",
    },
    {
      message: "Can you get me today date?",
      sender: "user",
      id: "id3",
    },
    {
      message: "Today is October 12",
      sender: "robot",
      id: "id4",
    },
  ]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-title-container">
          <span className="bot-avatar-header">🤖</span>
          <div>
            <h1>AI Chatbot Assistant</h1>
            <p className="subtitle">Powered by Gemini & React</p>
          </div>
        </div>
        <div className="status-container">
          <span className="status-indicator"></span>
          <span>Online</span>
        </div>
      </header>
      <main className="app-main">
        <ChatMessages chatMessages={chatMessages} />
      </main>
      <footer className="app-footer">
        <ChatInput setChatMessages={setChatMessages} />
      </footer>
    </div>
  );
}

export default App;
