import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import './ChatInput.css'

export function ChatInput({chatMessages, setChatMessages}) {
     const [inputText, setInputText]= useState("");               
     function saveInputText(e){
          setInputText(e.target.value);
     };

     async function sendMessage(){
          setInputText("");

          if(inputText==""){
               return;
          }

          const newMessages =[
               ...chatMessages,
               {
                    message:inputText,
                    sender:"user",
                    id:crypto.randomUUID()

               }
          ];
          setChatMessages([                        
                    ...newMessages,
               {
                    message:'Loading...',
                    sender:"robot",
                    id:crypto.randomUUID()

               }
          ])

          const response = await Chatbot.getResponseAsync(inputText)
          setChatMessages([                        
                    ...newMessages,
               {
                    message:response,
                    sender:"robot",
                    id:crypto.randomUUID()

               }
          ])
     };
     return (
          <div className="chat-input-container">
               <input type="text" placeholder="Send a message to chatbot" size="30" onChange={saveInputText} value={inputText} className="chat-input"/>
               <button onClick={sendMessage} className="send-btn">Send</button>
          </div>
     );
}