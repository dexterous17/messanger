import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, InputGroup, HTMLSelect } from '@blueprintjs/core';
import '../css/RegistrationFormPartTwo.css'; // Import the CSS file
import AvatarUpload from './AvatarUpload';

const countries = [
    { name: 'Select country', code: '' }, // Add default value
    { name: 'Canada', code: 'CA' },
    { name: 'United States', code: 'US' },
    { name: 'Mexico', code: 'MX' },
    // add more countries here
];

const RegistrationFormPartTwo = ({ initialValues, onSubmit, onPrevious }) => {
    const validationSchema = Yup.object({
        phoneNumber: Yup.string().required('Phone number is required'),
        countryCode: Yup.string().required('Country code is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        // Get the avatar image from formik values
        const avatar = values.avatar;

        // Get the phone number from formik values
        const phoneNumber = values.phoneNumber;

        // Get the country code from formik values
        const countryCode = values.countryCode;

        // Add the avatar, phone number, and country code to the values object
        const updatedValues = {
            ...values,
            avatar,
            phoneNumber,
            countryCode,
        };

        // Pass the updated values object to the onSubmit function
        await onSubmit(updatedValues);

        setSubmitting(false);
    };

    return (<div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {({ isSubmitting, setFieldValue, values, errors }) => (
                <Form className='form-container'>
                    <AvatarUpload label="Avatar" name="avatar" sizeLimit={2000000} />
                    <FormGroup label="Phone Number">
                        <div style={{ display: 'flex' }}>
                            <HTMLSelect
                                style={{ marginRight: '5px' }}
                                options={countries.map((c) => ({ label: `${c.name} (+${c.code})`, value: c.code }))}
                                value={values.countryCode}
                                onChange={(e) => setFieldValue('countryCode', e.target.value)}
                                fill
                            />
                            <InputGroup
                                name="phoneNumber"
                                placeholder="Enter phone number"
                                value={values.phoneNumber}
                                onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
                                fill
                            />
                        </div>
                        {errors.countryCode && <p className="bp3-form-helper-text bp3-intent-danger">{errors.countryCode}</p>}
                        <ErrorMessage name="phoneNumber">
                            {(msg) => <p className="bp3-form-helper-text bp3-intent-danger">{msg}</p>}
                        </ErrorMessage>
                    </FormGroup>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button type="button" onClick={onPrevious}>
                            Previous
                        </Button>
                        <Button type="submit" intent="primary" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </div>
                </Form>
            )}
        </Formik></div>
    );
};

export default RegistrationFormPartTwo;
