import React, { useEffect, useState, useRef } from 'react';
import jwt_decode from 'jwt-decode';
import '../css/messagelist.css';
import { Button} from '@blueprintjs/core';
import api from '../api/api';
import Message from './message';

function MessageList({ recipient, sendMessage, socket }) {
  const [message, setMessage] = useState();
  const [sendmessage, setSendmessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const decodedToken = jwt_decode(localStorage.getItem('jwtToken'));
    const senderid = decodedToken.id;
    const recipientid = recipient.id;
    sendMessage(senderid, recipientid, sendmessage);
    setSendmessage('');
  };

  const handleChange = (event) => {
    setSendmessage(event.target.value);
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
  });

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  return (
    <div className='message-list'>
      <div className='message-title'>
        <img src='' alt='' />
        <div>{recipient?.name}</div>
      </div>
      <div className='message-main' ref={containerRef}>
        <Message message={message} recipient={recipient} />
      </div>
      <div className='message-footer'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={sendmessage}
            onChange={handleChange}
            placeholder='Enter message'
          />
          <Button type='submit' text='Send' />
        </form>
      </div>
    </div>
  );
}

export default MessageList;
