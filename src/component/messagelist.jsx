import React, { useEffect, useState, useRef } from 'react';
import jwt_decode from 'jwt-decode';
import '../css/messagelist.css';
import { Card, Elevation } from '@blueprintjs/core';
import api from '../api/api';
import Message from './message';
import MessageTitle from './MessageTitle';
import MessageFooter from './MessageFooter';

function MessageList({ recipient, socket }) {
  const [message, setMessage] = useState([]);

  const sendMessage = (sendmessage) => {
    const decodedToken = jwt_decode(localStorage.getItem('jwtToken'));
    const senderid = decodedToken.id;
    const recipientid = recipient.id;
    socket.emit('send_message', { sender_id: senderid, recipient_id: recipientid, content: sendmessage });
  };

  const containerRef = useRef(null);

  const scrollToBottom = () => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight - containerRef.current.clientHeight;
    containerRef.current.scrollIntoView({ behavior: "smooth" });
    console.log(containerRef.current.scrollTop)
  };

  useEffect(() => {
    const decodedToken = jwt_decode(localStorage.getItem('jwtToken'));
    const sender_id = decodedToken.id;

    async function fetchMessages() {
      try {
        const response = await api.post('/fetchmessages', {
          headers: {
            Authorization: localStorage.getItem('jwtToken'),
          },
          data: {
            sender_id: sender_id,
            recipient_id: recipient.id,
          },
        });
        setMessage(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMessages();
    setTimeout(() => scrollToBottom(), 100);
  }, [recipient]);


  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessage((prevState) => [...prevState, data]);
    });
    return () => {
      socket.off('receive_message');
    };
  }, [socket]);

  return (
    <Card className='message-list' elevation={Elevation.THREE} style={{ padding: "0px" }}>
      <MessageTitle recipient={recipient} />
      <div className='message-main' ref={containerRef} style={{ padding: "0px" }}>
        <Message message={message} recipient={recipient} />
      </div>
      <MessageFooter sendMessage={sendMessage} />
    </Card>
  );
}

export default MessageList;
