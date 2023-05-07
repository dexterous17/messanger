import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';

const SettingsSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
});
function ProfileComponent() {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
        },
        validationSchema: SettingsSchema,
        onSubmit: (values) => {
            console.log(values);
        },
        validateOnBlur: false,
    });

    return (<form onSubmit={formik.handleSubmit}>
        <FormGroup
            label="Name"
            labelFor="name"
            labelInfo="(required)"
            helperText={
                formik.touched.name && formik.errors.name ? formik.errors.name : null
            }
        >
            <InputGroup
                id="name"
                name="name"
                placeholder="Enter your Full name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
        </FormGroup>
        <FormGroup
            label="Email"
            labelFor="email"
            labelInfo="(required)"
            helperText={
                formik.touched.email && formik.errors.email ? formik.errors.email : null
            }
        >
            <InputGroup
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
        </FormGroup>
        <Button type="submit" text="Submit" />
    </form>)
}

export default ProfileComponent;