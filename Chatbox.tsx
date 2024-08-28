import React, { useState } from 'react';
import styles from './Chatbox.module.css'; 
import Monitor from '../MonitorLogo/MonitorLogo';
import PaperClip from '../PaperClip/PaperClip';
import ChatInput from '../ChatInput/ChatInput';
import SubmitButton from '../SubmitButton/SubmitButton';
import ChatService from '../../services/ChatService';

type ChatboxProps = {
  chatHistory: { text: string; sender: string; }[];
  setChatHistory: React.Dispatch<React.SetStateAction<{ text: string; sender: string; }[]>>;
  onMessageSend: () => void;
  messageSent: boolean;
};

const Chatbox: React.FC<ChatboxProps> = ({ chatHistory, setChatHistory, onMessageSend, messageSent }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = async () => {
      
      setChatHistory(prev => [...prev, { text: message, sender: 'user' }]);
      try {
        const response = await ChatService.createCompletion({ text: message, sender: 'user' });
        const responseContent = response.data.content;
        setChatHistory(prev => [...prev, { text: responseContent, sender: 'server' }]);
      } catch (error) {
        console.error('Error sending message:', error);
        setChatHistory(prev => [...prev, { text: "Sorry, there was an error processing your request.", sender: 'server' }]);
      }
      onMessageSend();
      setMessage('');
    };

    return (
      <div className={`${styles.Chatbox} ${messageSent ? styles.ChatboxBottom : ''}`}>
        <Monitor/>
        <PaperClip/>
        <ChatInput message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} />
        <SubmitButton handleSendMessage={handleSendMessage} />
      </div>
    );
};

export default Chatbox;