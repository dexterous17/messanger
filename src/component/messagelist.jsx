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
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  };

  useEffect(() => {
    const decodedToken = jwt_decode(localStorage.getItem('jwtToken'));
    const sender_id = decodedToken.id;
    api
      .post('/fetchmessages', {
        headers: {
          Authorization: localStorage.getItem('jwtToken'),
        },
        data: {
          sender_id: sender_id,
          recipient_id: recipient.id,
        },
      })
      .then((data) => {
        setMessage(data.data);
        scrollToBottom();
      })
      .catch();
  }, [recipient]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data);
      setMessage((prevState) => [...prevState, data]);
    });
    return () => {
      socket.off('receive_message');
    };
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  return (
    <Card className='message-list' elevation={Elevation.THREE}>
      <MessageTitle recipient={recipient} />
      <Card className='message-main' ref={containerRef}>
        <Message message={message} recipient={recipient} />
      </Card>
      <MessageFooter sendMessage={sendMessage} />
    </Card>
  );
}

export default MessageList;
