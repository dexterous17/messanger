import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';

const SettingsSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'New password must be at least 8 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

function Passwordreset() {
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: SettingsSchema,
    onSubmit: (values) => {
      console.log('values:', values);
    },
  });

  return (
    <div className="settings">
      <h1>Password Change</h1>
      <form onSubmit={formik.handleSubmit}>
        <FormGroup
          label="Current Password"
          labelFor="currentPassword"
          labelInfo="(required)"
          helperText={
            formik.touched.currentPassword && formik.errors.currentPassword ? formik.errors.currentPassword : null
          }
        >
          <InputGroup
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={formik.values.currentPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Enter your current password"
          />
        </FormGroup>
        <FormGroup
          label="New Password"
          labelFor="newPassword"
          labelInfo="(required, minimum 8 characters)"
          helperText={
            formik.touched.newPassword && formik.errors.newPassword ? formik.errors.newPassword : null
          }
        >
          <InputGroup
            id="newPassword"
            name="newPassword"
            type="password"
            value={formik.values.newPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Enter your new password"
          />
        </FormGroup>
        <FormGroup
          label="Confirm Password"
          labelFor="confirmPassword"
          labelInfo="(required)"
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : null
          }
        >
          <InputGroup
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Confirm your new password"
          />
        </FormGroup>
        <Button type="submit" text="Submit" />
      </form>
    </div>
  );
}

export default Passwordreset;
