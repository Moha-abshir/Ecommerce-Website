import RobotProfileImage from '../assets/robot.png';
import userProfileImage from '../assets/user.png';
import './ChatMessage.css'

export function ChatMessage({ message, sender }) {
     return (
          <div className={sender==="user"?"chat-message-user":"chat-message-robot"}>
               {sender === "robot" && <img src={RobotProfileImage} width="50px" />}
          <div className="chat-message-text">{message}</div>
          {sender === "user" && <img src={userProfileImage} width="50px" />}
          </div>
     );
}