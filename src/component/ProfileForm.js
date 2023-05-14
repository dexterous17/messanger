import React, { useState, useEffect } from 'react';
import { Button, Card, Spinner } from '@blueprintjs/core';
import { Formik } from 'formik';
import * as yup from 'yup';
import PhoneNumberInput from './PhoneNumberInput';
import AvatarUpload from './AvatarUpload';
import NameAndEmailFormFields from './NameAndEmailFormFields';
import { countries } from '../helperfunction/countries';
import ImagePreview from './ImagePreview';
import api from '../api/api';

const schema = yup.object().shape({
    name: yup.string().required('Please enter your name'),
    email: yup.string().email('Please enter a valid email address').required('Please enter your email'),
    phonenumber: yup.string().required('Please enter a valid phone number'),
    countrycode: yup.string().required('Please select a country code'),
});

export default function ProfileForm() {
    const [isLoading, setIsLoading] = useState(true);
    const [isEditable, setIsEditable] = useState(false);
    const [formData, setFormData] = useState({
        avatar_url: '',
        name: '',
        email: '',
        phonenumber: '',
        countrycode: '',
        new_avatar_url: ''
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                const response = await api.get('/getprofile', {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });
                const { avatar_url, countrycode, email, name, phonenumber } = response.data;
                setFormData({
                    avatar_url: avatar_url,
                    name: name,
                    email: email,
                    phonenumber: phonenumber,
                    countrycode: countrycode,
                    new_avatar_url: ''
                });
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserProfile();
    }, []);

    const handleEditClick = () => {
        setIsEditable(true);
    };

    const handleCancelClick = (formik) => {
        setIsEditable(false);
        formik.resetForm(formData);
    };

    return (isLoading) ? (<Spinner size={Spinner.SIZE_SMALL} />) : (
        <Card>
            <h3>Profile</h3>

            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={schema}
                onSubmit={async (values) => {
                    console.log(values)
                    setIsLoading(true);
                    try {
                        const jwtToken = localStorage.getItem('jwtToken');
                        const formData = new FormData();
                        formData.append('avatar_url', values.new_avatar_url);
                        formData.append('name', values.name);
                        formData.append('email', values.email);
                        formData.append('phoneNumber', values.phonenumber);
                        formData.append('countrycode', values.countrycode);


                        const response = await api.post('/postprofile', formData, {
                            headers: {
                                Authorization: `Bearer ${jwtToken}`
                            },
                        });
                        console.log(response)
                        setFormData({ ...response.data, new_avatar_url: '' })
                        setIsEditable(false);
                    } catch (error) {
                        console.error(error);
                    } finally {
                        setIsLoading(false);
                    }
                }}

            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        {isEditable ? (
                            <AvatarUpload
                                label="Avatar"
                                name="new_avatar_url"
                                sizeLimit={1000000}
                            />
                        ) : (
                            <ImagePreview imageUrl={formik.values.avatar_url} altText={formik.values.name} />
                        )}
                        <NameAndEmailFormFields
                            isEditable={isEditable}
                            values={formik.values}
                            touched={formik.touched}
                            errors={formik.errors}
                            setFieldValue={formik.setFieldValue}
                        />
                        <PhoneNumberInput
                            countries={countries}
                            values={formik.values}
                            errors={formik.errors}
                            setFieldValue={formik.setFieldValue}
                            isEditable={isEditable}
                        />
                        {!isEditable ? (
                            <Button onClick={handleEditClick}>Edit</Button>
                        ) : (
                            <>
                                <Button type="submit" disabled={isLoading}>
                                    Submit
                                </Button>
                                <Button onClick={() => handleCancelClick(formik)}>Cancel</Button>
                            </>
                        )}
                    </form>
                )}
            </Formik>
        </Card >
    );
}
