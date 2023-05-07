import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';

const NameSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

function NameForm({ handleSubmit }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      confirmPassword: '',
      email: '',
    },
    validationSchema: NameSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div>
      <h2>Registration Form (Part 1 of 2)</h2>
      <form onSubmit={formik.handleSubmit}>
        <FormGroup
          label="Full Name"
          labelFor="name"
          labelInfo="(required)"
          helperText={formik.touched.name && formik.errors.name ? formik.errors.name : null}
        >
          <InputGroup
            id="name"
            name="name"
            placeholder="Enter your Full name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
        </FormGroup>
        <FormGroup
          label="Password"
          labelFor="password"
          labelInfo="(required)"
          helperText={
            formik.touched.password && formik.errors.password ? formik.errors.password : null
          }
        >
          <InputGroup
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </FormGroup>
        <FormGroup
          label="Confirm Password"
          labelFor="confirmPassword"
          labelInfo="(required)"
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : null
          }
        >
          <InputGroup
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
        </FormGroup>
        <FormGroup
          label="Email"
          labelFor="email"
          labelInfo="(required)"
          helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
        >
          <InputGroup
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </FormGroup>
        <Button type="submit" text="Next" />
      </form>
    </div>
  );
}

export default NameForm;
