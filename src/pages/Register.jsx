import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../api/api'

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

function Register() {
  const initialValues = { email: '', password: '' };

  function handleSubmit(values, { setSubmitting }) {
    // Call API to register user with email and password
    api.post('/register', values)
      .then(response => {
        console.log(response.data);
        setSubmitting(false);
      })
      .catch(error => {
        console.log(error);
        setSubmitting(false);
      });
  }

  function validateEmail(email) {
    try {
      validationSchema.validateSync({ email });
      return true; // Email is valid
    } catch (error) {
      return false; // Email is invalid
    }
  }

  function handleEmailBlur(event, setFieldValue) {
    const email = event.target.value;
    
    if(validateEmail(email)){
    api.get(`/check-email/${email}`)
      .then(response => {
        setFieldValue('email', email);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }

  }

  return (
    <div>
      <h1>Register</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" onBlur={(event) => handleEmailBlur(event, setFieldValue)} />
              <ErrorMessage name="email" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" />
            </div>
            <button type="submit" disabled={isSubmitting}>Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
