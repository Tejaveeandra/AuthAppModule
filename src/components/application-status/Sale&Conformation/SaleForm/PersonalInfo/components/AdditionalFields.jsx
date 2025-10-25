import FieldRenderer from "./FieldRenderer";
import styles from "./AdditionalFields.module.css";

const AdditionalFields = ({ 
  values, 
  handleChange, 
  handleBlur, 
  touched, 
  errors,
  admissionReferredByOptions,
  quotaOptions,
  admissionTypeOptions,
  genderOptions,
  authorizedByOptions,
  formFields,
  setFieldValue
}) => {
  return (
    <div className={styles.additional_fields_grid_container}>
      <div className={styles.additional_fields_form_row}>
        <FieldRenderer
          fields={formFields.slice(3, 6)}
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
          admissionReferredByOptions={admissionReferredByOptions}
          quotaOptions={quotaOptions}
          admissionTypeOptions={admissionTypeOptions}
          genderOptions={genderOptions}
          authorizedByOptions={authorizedByOptions}
          errorClassName={styles.additional_fields_error}
          setFieldValue={setFieldValue}
        />
      </div>

      <div className={styles.additional_fields_form_row}>
        <FieldRenderer
          fields={formFields.slice(6, 7)}
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
          admissionReferredByOptions={admissionReferredByOptions}
          quotaOptions={quotaOptions}
          admissionTypeOptions={admissionTypeOptions}
          genderOptions={genderOptions}
          authorizedByOptions={authorizedByOptions}
          errorClassName={styles.additional_fields_error}
          setFieldValue={setFieldValue}
        />

        <FieldRenderer
          fields={formFields.slice(7, 8)}
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
          admissionReferredByOptions={admissionReferredByOptions}
          quotaOptions={quotaOptions}
          admissionTypeOptions={admissionTypeOptions}
          genderOptions={genderOptions}
          authorizedByOptions={authorizedByOptions}
          errorClassName={styles.additional_fields_error}
          setFieldValue={setFieldValue}
        />

        <FieldRenderer
          fields={formFields.slice(8, 9)}
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
          admissionReferredByOptions={admissionReferredByOptions}
          quotaOptions={quotaOptions}
          admissionTypeOptions={admissionTypeOptions}
          genderOptions={genderOptions}
          authorizedByOptions={authorizedByOptions}
          errorClassName={styles.additional_fields_error}
          setFieldValue={setFieldValue}
        />
      </div>
    </div>
  );
};

export default AdditionalFields;
