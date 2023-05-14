import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';

function MessageTitle({ recipient }) {
  return (
    <Card className='message-title' elevation={Elevation.TWO}>
      <img src='' alt='' />
      <div>{recipient?.name}</div>
    </Card>
  );
}

export default MessageTitle;
