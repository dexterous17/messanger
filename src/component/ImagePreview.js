import React from 'react';
import Avatar from 'react-avatar';

const ImagePreview = ({ imageUrl, altText, style,size }) => {
  const previewImage = imageUrl ? (
    <img src={'http://localhost:3000/image/' + imageUrl} alt={altText} />
  ) : (
    <Avatar name={altText} size={size}/>
  );

  return (
    <div className="image-preview" style={style}>
      {previewImage}
    </div>
  );
};

export default ImagePreview;
