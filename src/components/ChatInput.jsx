import { useState } from "react";
import { Chatbot } from "supersimpledev";
import "./ChatInput.css";

export function ChatInput({ setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function clicked() {
    sendMessage();
  }

  function press(event) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  async function sendMessage() {
    const trimmedInput = inputText.trim();
    if (isLoading || trimmedInput === "") {
      return;
    }

    const userMessageId = crypto.randomUUID();
    const loadingMessageId = crypto.randomUUID();

    // Clear input field immediately for good UX
    setInputText("");
    setIsLoading(true);

    // Append both the user message and the loading placeholder using functional update
    setChatMessages((prev) => [
      ...prev,
      {
        message: trimmedInput,
        sender: "user",
        id: userMessageId,
      },
      {
        message: "Loading...",
        sender: "robot",
        id: loadingMessageId,
      },
    ]);

    try {
      const response = await Chatbot.getResponseAsync(trimmedInput);
      setChatMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessageId ? { ...msg, message: response } : msg
        )
      );
    } catch (error) {
      console.error("ChatBot error:", error);
      setChatMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessageId
            ? { ...msg, message: "Error: Failed to fetch response. Please try again." }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="chat-input-container">
      <input
        id="chatbot-input"
        placeholder={isLoading ? "Chatbot is thinking..." : "Type hello to start speaking with ChatBot!"}
        onChange={saveInputText}
        value={inputText}
        onKeyDown={press}
        className="chat-input"
        disabled={isLoading}
        autoComplete="off"
      />
      <button
        id="chatbot-send-button"
        onClick={clicked}
        className="send-button"
        disabled={isLoading || inputText.trim() === ""}
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
