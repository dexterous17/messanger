import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import ImagePreview from './ImagePreview';

function MessageTitle({ recipient }) {
  console.log(recipient)
  return (
    <Card className='message-title' elevation={Elevation.TWO} style={{ padding: "0px", display: 'flex', alignItems: 'baseline' }}>
      <ImagePreview imageUrl={recipient?.avatar_url} altText={recipient?.name} style={{}} size={41} />
      <div>{recipient?.name}</div>
    </Card>
  );
}

export default MessageTitle;
