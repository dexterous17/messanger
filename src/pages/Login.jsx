import React from 'react';
import { Button, Card, FormGroup, InputGroup } from '@blueprintjs/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../css/login.css';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Login({ socket }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(socket.connected);
        const response = await api.post('/login', values);
        const token = response.data.token;
        console.log(token);
        localStorage.setItem('jwtToken', token);
        console.log('Login successful!');
        // Redirect to the profile page or perform any other actions
        socket.connect();
        console.log(socket.connected);
        navigate('/');
      } catch (error) {
        console.log('Login failed:', error);
      }
    },
  });

  return (
    <div className='Login'>
      <h1>Login</h1>
      <Card>
        <form className='Login-main' onSubmit={formik.handleSubmit}>
          <FormGroup
            label='Username'
            labelFor='email'
            helperText={formik.touched.email && formik.errors.email}
            intent={formik.touched.email && formik.errors.email ? 'danger' : 'none'}
          >
            <InputGroup
              id='email'
              name='email'
              type='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fill
              intent={formik.touched.email && formik.errors.email ? 'danger' : 'none'}
            />
          </FormGroup>
          <FormGroup
            label='Password'
            labelFor='password'
            helperText={formik.touched.password && formik.errors.password}
            intent={formik.touched.password && formik.errors.password ? 'danger' : 'none'}
          >
            <InputGroup
              id='password'
              name='password'
              type='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fill
              intent={formik.touched.password && formik.errors.password ? 'danger' : 'none'}
            />
          </FormGroup>
          <Button type='submit' intent='primary' disabled={formik.isSubmitting}>
            Log In
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Login;
