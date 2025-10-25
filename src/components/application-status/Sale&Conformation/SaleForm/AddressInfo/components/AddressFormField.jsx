import React from 'react';
import { Field } from 'formik';
import Inputbox from '../../../../../../widgets/Inputbox/InputBox';
import Dropdown from '../../../../../../widgets/Dropdown/Dropdown';
import SearchBox from '../../../../../../widgets/Searchbox/Searchbox';
import { ReactComponent as SearchIcon } from '../../../../../../assets/application-status/Group.svg';
import styles from './AddressFormField.module.css';

const AddressFormField = ({ field, values, handleChange, handleBlur, errors, touched }) => {
  const getOptions = (optionsKey) => {
    const optionsMap = {
      "stateOptions": [
        { value: "state1", label: "State 1" },
        { value: "state2", label: "State 2" },
        { value: "state3", label: "State 3" }
      ],
      "districtOptions": [
        { value: "district1", label: "District 1" },
        { value: "district2", label: "District 2" },
        { value: "district3", label: "District 3" }
      ],
      "mandalOptions": [
        { value: "mandal1", label: "Mandal 1" },
        { value: "mandal2", label: "Mandal 2" },
        { value: "mandal3", label: "Mandal 3" }
      ],
      "cityOptions": [
        { value: "mumbai", label: "Mumbai" },
        { value: "delhi", label: "Delhi" },
        { value: "bangalore", label: "Bangalore" }
      ]
    };
    return optionsMap[optionsKey] || [];
  };

  return (
    <div className={styles.address_info_form_field}>
      <Field name={field.name}>
        {({ field: fieldProps, meta }) => {
          const options = getOptions(field.options);
          const stringOptions = options.map(option => option.label || option.value);

          if (field.type === "dropdown") {
            return (
              <Dropdown
                dropdownname={field.label}
                id={field.id}
                name={field.name}
                value={values[field.name] || ""}
                onChange={handleChange}
                results={stringOptions}
                required={field.required}
                disabled={false}
                dropdownsearch={false}
              />
            );
          } else if (field.type === "search") {
            return (
              <div className={styles.gpin_field_container}>
                <label htmlFor={field.name} className={styles.gpin_field_label}>
                  {field.label}
                  {field.required && <span className={styles.gpin_field_required}>*</span>}
                </label>
                <div className={styles.gpin_search_container}>
                  <SearchBox
                    id={field.id}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={values[field.name] || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    searchicon={<SearchIcon />}
                  />
                </div>
                {meta.touched && meta.error && (
                  <div className={styles.gpin_field_error}>
                    {meta.error}
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <Inputbox
                label={field.label}
                id={field.id}
                name={field.name}
                placeholder={field.placeholder}
                value={values[field.name] || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                type={field.type}
                error={meta.touched && meta.error}
                required={field.required}
              />
            );
          }
        }}
      </Field>
      {touched[field.name] && errors[field.name] && (
        <div className={styles.address_info_error}>
          {errors[field.name]}
        </div>
      )}
    </div>
  );
};

export default AddressFormField;
