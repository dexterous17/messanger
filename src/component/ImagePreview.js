import React from 'react';
import Avatar from 'react-avatar';
const ImagePreview = ({ imageUrl, altText }) => {
    const previewImage = imageUrl ? (
        <img src={'http://localhost:3000/image/' + imageUrl} alt={altText} />
    ) : (
        <Avatar name={altText} />
    );

    return <div className="image-preview" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: 'center'
    }} >{previewImage}</div>;
};

export default ImagePreview;
