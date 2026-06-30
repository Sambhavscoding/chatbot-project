import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/user.png";
import "./ChatMessage.css";

export function ChatMessage({ message, sender }) {
  const isLoadingMsg = message === "Loading...";
  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img src={RobotProfileImage} className="chat-message-profile" alt="Bot" />
      )}
      <div className={`chat-message-text ${isLoadingMsg ? "loading-message" : ""}`}>
        {isLoadingMsg ? (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          message
        )}
      </div>
      {sender === "user" && (
        <img src={UserProfileImage} className="chat-message-profile" alt="User" />
      )}
    </div>
  );
}

export default ChatMessage;
