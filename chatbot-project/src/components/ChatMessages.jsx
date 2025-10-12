import { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import './ChatMessages' 

function ChatMessages({chatMessages}) {
     const chatMessagesRef=useRef(null);
     useEffect(()=>{
     const containerElem=chatMessagesRef.current;
          if(containerElem){
               containerElem.scrollTop = containerElem.scrollHeight;
          }
     }, [chatMessages])
     return (
          <div className="chat-messages-container" ref={chatMessagesRef}>
               {chatMessages.map((item) => (
                    <ChatMessage
                    message={item.message}
                    sender={item.sender}
                    key={item.id}
                    />
               ))}
          </div>
     );
}

export default ChatMessages;