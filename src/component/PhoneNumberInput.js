import { FormGroup, HTMLSelect, InputGroup } from '@blueprintjs/core';
import { ErrorMessage } from 'formik';

const PhoneNumberInput = ({ countries, setFieldValue, values, errors, isEditable }) => {
    return (
        <FormGroup label="Phone Number">
            <div style={{ display: 'flex' }}>
                <HTMLSelect
                    style={{ marginRight: '5px' }}
                    options={countries.map((c,_) => ({ label: `${c.name} (+${c.code})`, value: c.code,key:c._ }))}
                    value={values.countrycode}
                    onChange={(e) => setFieldValue('countrycode', e.target.value)}
                    fill
                    disabled={!isEditable}
                />
                <InputGroup
                    name="phonenumber"
                    placeholder="Enter phone number"
                    value={values.phonenumber}
                    onChange={(e) => setFieldValue('phonenumber', e.target.value)}
                    fill
                    disabled={!isEditable}
                />
            </div>
            {errors.countrycode && <p className="bp3-form-helper-text bp3-intent-danger">{errors.countrycode}</p>}
            <ErrorMessage name="phonenumber">
                {(msg) => <p className="bp3-form-helper-text bp3-intent-danger">{msg}</p>}
            </ErrorMessage>
        </FormGroup>
    );
};

export default PhoneNumberInput;
