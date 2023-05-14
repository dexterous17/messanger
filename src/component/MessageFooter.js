import React, { useState } from 'react';
import { Button, InputGroup } from '@blueprintjs/core';

function MessageFooter({ sendMessage }) {
  const [sendmessage, setSendmessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(sendmessage);
    setSendmessage('');
  };

  const handleChange = (event) => {
    setSendmessage(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        value={sendmessage}
        onChange={handleChange}
        placeholder='Enter message'
        rightElement={<Button type='submit' text='Send' />}
      />
    </form>
  );
}

export default MessageFooter;
