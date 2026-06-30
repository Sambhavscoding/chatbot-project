import { useRef, useEffect } from "react";
import "./ChatMessages.css";
import ChatMessage from "./ChatMessage.jsx";

function useAutoScroll(triggerValue) {
  const containerRef = useRef(null);
  useEffect(() => {
    const containerElem = containerRef.current;

    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [triggerValue]);

  return containerRef;
}

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll(chatMessages);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}

export default ChatMessages;
