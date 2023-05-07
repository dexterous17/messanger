import React from 'react';
import { useField } from 'formik';
import { Intent } from '@blueprintjs/core';
import '../css/AvatarUpload.css'

const AvatarUpload = ({ label, name, sizeLimit }) => {
  const [field, meta, helpers] = useField(name);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      if (file.size <= sizeLimit) {
        helpers.setValue(file);
      } else {
        helpers.setValue(null);
        helpers.setError(`File size must be less than ${sizeLimit} bytes`);
      }
    }
  };

  const handleRemoveClick = () => {
    helpers.setValue(null);
  };

  return (
    <div className="avatar-upload">
      <div className="avatar-upload__label">{label}</div>
      <div
        className="avatar-upload__preview"
        style={{
          backgroundImage: field.value ? `url(${URL.createObjectURL(field.value)})` : null,
          border: `2px solid ${meta.touched && meta.error ? Intent.DANGER : Intent.NONE}`,
        }}
      >
        {!field.value && (
          <label htmlFor={name} className="avatar-upload__overlay">
            <div className="avatar-upload__plus-icon">+</div>
          </label>
        )}
        {field.value && (
          <div className="avatar-upload__remove-icon" onClick={handleRemoveClick}>
            &#10006;
          </div>
        )}
        <input
          type="file"
          id={name}
          name={name}
          accept="image/*"
          onChange={handleFileChange}
          className="avatar-upload__input"
        />
      </div>
      {meta.touched && meta.error && <div className="avatar-upload__error">{meta.error}</div>}
    </div>
  );
};

export default AvatarUpload;
