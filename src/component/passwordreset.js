import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, InputGroup, Card } from '@blueprintjs/core';

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
    const [isFieldsEnabled, setIsFieldsEnabled] = useState(false);

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: SettingsSchema,
        onSubmit: async (values) => {
            const jwtToken = localStorage.getItem('jwtToken')
            try {
                const response = await fetch('/reset-password', {
                    method: 'POST',
                    headers: {
                        Authorization: `${jwtToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) {
                    throw new Error('Failed to reset password');
                }

                console.log('Password reset successfully');
            } catch (error) {
                console.error(error);
            }
        },
    });

    const handleToggleFields = () => {
        setIsFieldsEnabled((prevIsFieldsEnabled) => !prevIsFieldsEnabled);
    };

    return (
        <Card className="settings">
            <h3>Password Change</h3>
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
                        disabled={!isFieldsEnabled}
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
                        disabled={!isFieldsEnabled}
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
                        disabled={!isFieldsEnabled}
                    />
                </FormGroup>
                <Button type="submit" text="Submit" disabled={!isFieldsEnabled} />
                <Button text={isFieldsEnabled ? "Disable fields" : "Enable fields"} onClick={handleToggleFields} style={{ marginLeft: '10px' }} />
            </form>
        </Card>
    );

}

export default Passwordreset;
