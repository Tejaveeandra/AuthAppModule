import React from 'react';
import { Field } from 'formik';
import Inputbox from '../../../../../../widgets/Inputbox/InputBox';
import Dropdown from '../../../../../../widgets/Dropdown/Dropdown';
import styles from './PaymentFormFields.module.css';

const PaymentFormFields = ({ formFields, values, handleChange, handleBlur }) => {
  return (
    <div className={styles.form_fields_container}>
      {formFields.map((field, index) => (
        <div key={field.name} className={styles.form_field}>
          <Field name={field.name}>
            {({ field: fieldProps, meta }) => (
              field.type === "dropdown" ? (
                <Dropdown
                  dropdownname={field.label}
                  name={field.name}
                  value={values[field.name] || ""}
                  onChange={handleChange}
                  results={field.options || []}
                  required={field.required}
                  disabled={false}
                  dropdownsearch={false}
                />
              ) : (
                <Inputbox
                  label={field.label}
                  name={field.name}
                  value={values[field.name] || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type={field.type}
                  placeholder={field.placeholder}
                  error={meta.touched && meta.error}
                  required={field.required}
                />
              )
            )}
          </Field>
        </div>
      ))}
    </div>
  );
};

export default PaymentFormFields;
