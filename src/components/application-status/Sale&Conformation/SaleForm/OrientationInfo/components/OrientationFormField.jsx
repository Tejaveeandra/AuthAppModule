import React, { useState, useEffect } from 'react';
import { Field } from 'formik';
import Inputbox from '../../../../../../widgets/Inputbox/InputBox';
import Dropdown from '../../../../../../widgets/Dropdown/Dropdown';
import axios from 'axios';
import styles from './OrientationFormField.module.css';

const OrientationFormField = ({ field, values, handleChange, handleBlur, errors, touched, setFieldValue }) => {
  const [branchTypeOptions, setBranchTypeOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [studentTypeOptions, setStudentTypeOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [orientationOptions, setOrientationOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // API call to fetch student types
  const fetchStudentTypes = async () => {
    try {
      console.log('=== FETCHING STUDENT TYPES ===');
      
      const response = await axios.get('http://localhost:8080/api/student-admissions-sale/student-types', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Student types API response:', response.data);
      
      if (response.data && Array.isArray(response.data)) {
        const transformedOptions = response.data.map(item => ({
          value: item.student_type_id || item.id,
          label: item.student_type_name || item.name || item.title
        }));
        
        setStudentTypeOptions(transformedOptions);
        console.log('Transformed student types:', transformedOptions);
      }
      
      console.log('=== END FETCHING STUDENT TYPES ===');
    } catch (error) {
      console.error('Error fetching student types:', error);
    }
  };

  // Fetch student types on component mount
  React.useEffect(() => {
    fetchStudentTypes();
  }, []);

  // Fetch classes when Joining Class field renders and branch is selected
  React.useEffect(() => {
    if (field.name === "joiningClass" && values.branch) {
      console.log('Joining Class field detected branch selection:', values.branch);
      fetchClassesByCampus(921);
    }
  }, [field.name, values.branch]);

  // Fetch orientations when Orientation Name field renders and joining class is selected
  React.useEffect(() => {
    if (field.name === "orientationName" && values.joiningClass) {
      console.log('Orientation Name field detected joining class selection:', values.joiningClass);
      
      // Find the class ID from the classOptions array
      const selectedClass = classOptions.find(option => option.label === values.joiningClass);
      if (selectedClass) {
        console.log('Found class ID:', selectedClass.value);
        fetchOrientationsByClass(selectedClass.value);
      } else {
        console.log('Class not found in classOptions, trying direct value:', values.joiningClass);
        // If not found, try using the value directly (in case it's already an ID)
        fetchOrientationsByClass(values.joiningClass);
      }
    }
  }, [field.name, values.joiningClass, classOptions]);


  // API call to fetch orientations by class
  const fetchOrientationsByClass = async (classId) => {
    try {
      console.log('=== FETCHING ORIENTATIONS BY CLASS ===');
      console.log('Class ID:', classId);
      
      const response = await axios.get(`http://localhost:8080/api/student-admissions-sale/orientations/by-class/${classId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Orientations by class API response:', response.data);
      
      if (response.data && Array.isArray(response.data)) {
        const transformedOptions = response.data.map(item => ({
          value: item.id,
          label: item.name
        }));
        
        setOrientationOptions(transformedOptions);
        console.log('Transformed orientation options:', transformedOptions);
        console.log('Orientation options count:', transformedOptions.length);
      }
      
      console.log('=== END FETCHING ORIENTATIONS BY CLASS ===');
    } catch (error) {
      console.error('Error fetching orientations by class:', error);
    }
  };

  // API call to fetch classes by campus
  const fetchClassesByCampus = async (campusId = 921) => {
    try {
      console.log('=== FETCHING CLASSES BY CAMPUS ===');
      console.log('Campus ID:', campusId);
      
      const response = await axios.get(`http://localhost:8080/api/student-admissions-sale/classes/by-campus/${campusId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Classes by campus API response:', response.data);
      
      if (response.data && Array.isArray(response.data)) {
        const transformedOptions = response.data.map(item => ({
          value: item.classId || item.class_id || item.id,
          label: item.className || item.class_name || item.name || item.title
        }));
        
        setClassOptions(transformedOptions);
        console.log('Transformed class options:', transformedOptions);
      }
      
      console.log('=== END FETCHING CLASSES BY CAMPUS ===');
    } catch (error) {
      console.error('Error fetching classes by campus:', error);
    }
  };

  // API call to get campus type and city when branch is selected
  const fetchBranchDetails = async (branchValue) => {
    if (!branchValue) return;
    
    setLoading(true);
    try {
      console.log('=== FETCHING BRANCH DETAILS ===');
      console.log('Branch value:', branchValue);
      
      const response = await axios.get(`http://localhost:8080/api/student-admissions-sale/city/branchtype/20`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Branch details API response:', response.data);
      
      if (response.data) {
        const { campusType, cityName } = response.data;
        
        // Update branch type options
        if (campusType) {
          const branchTypeOption = [{ value: campusType.toLowerCase().replace(/\s+/g, '_'), label: campusType }];
          setBranchTypeOptions(branchTypeOption);
          setFieldValue('branchType', campusType);
          console.log('Set branchType to:', campusType);
        }
        
        // Update city options
        if (cityName) {
          const cityOption = [{ value: cityName.toLowerCase().replace(/\s+/g, '_'), label: cityName }];
          setCityOptions(cityOption);
          setFieldValue('city', cityName);
          console.log('Set city to:', cityName);
        }
      }
      
      console.log('=== END FETCHING BRANCH DETAILS ===');
      
      // Also fetch classes for the campus
      await fetchClassesByCampus(921);
      
    } catch (error) {
      console.error('Error fetching branch details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getOptions = (optionsKey) => {
    const optionsMap = {
      "classOptions": classOptions,
      "branchTypeOptions": branchTypeOptions,
      "branchOptions": (() => {
        // Get campus name from localStorage (from login response)
        const campusName = localStorage.getItem("campusName");
        console.log('=== BRANCH OPTIONS DEBUG ===');
        console.log('campusName from localStorage:', campusName);
        console.log('All localStorage items:', {
          empName: localStorage.getItem("empName"),
          empId: localStorage.getItem("empId"),
          designation: localStorage.getItem("designation"),
          category: localStorage.getItem("category"),
          campusName: localStorage.getItem("campusName")
        });
        
        if (campusName) {
          const branchOption = {
            value: campusName.toLowerCase().replace(/\s+/g, '_'),
            label: campusName
          };
          console.log('Created branch option:', branchOption);
          console.log('=== END BRANCH OPTIONS DEBUG ===');
          return [branchOption];
        }
        
        console.log('No campus name found, returning empty options');
        console.log('=== END BRANCH OPTIONS DEBUG ===');
        return [];
      })(),
      "orientationOptions": orientationOptions,
      "admissionTypeOptions": [],
      "studentTypeOptions": studentTypeOptions,
      "cityOptions": cityOptions
    };
    return optionsMap[optionsKey] || [];
  };

  return (
    <div className={styles.orientation_info_form_field}>
      <Field name={field.name}>
        {({ field: fieldProps, meta }) => {
          const options = getOptions(field.options);
          const stringOptions = options.map(option => option.label || option.value);

          // Auto-select campus for Branch field
          let fieldValue = values[field.name] || "";
          if (field.name === "branch" && !fieldValue && options.length > 0) {
            const campusName = localStorage.getItem("campusName");
            if (campusName) {
              fieldValue = campusName;
              // Auto-set the value if not already set
              if (!values[field.name]) {
                handleChange({
                  target: {
                    name: field.name,
                    value: campusName
                  }
                });
                // Trigger API call to get branch details
                fetchBranchDetails(campusName);
              }
            }
          }

          // Handle Branch field change to trigger API call
          const handleBranchChange = (e) => {
            handleChange(e);
            if (field.name === "branch") {
              fetchBranchDetails(e.target.value);
            }
          };

          // Debug logging for Joining Class field
          if (field.name === "joiningClass") {
            console.log('=== JOINING CLASS FIELD DEBUG ===');
            console.log('field.name:', field.name);
            console.log('field.options:', field.options);
            console.log('classOptions:', classOptions);
            console.log('classOptions length:', classOptions.length);
            console.log('options from getOptions:', options);
            console.log('stringOptions:', stringOptions);
            console.log('=== END JOINING CLASS FIELD DEBUG ===');
          }

          // Debug logging for Orientation Name field
          if (field.name === "orientationName") {
            console.log('=== ORIENTATION NAME FIELD DEBUG ===');
            console.log('field.name:', field.name);
            console.log('field.options:', field.options);
            console.log('values.joiningClass:', values.joiningClass);
            console.log('orientationOptions:', orientationOptions);
            console.log('orientationOptions length:', orientationOptions.length);
            console.log('options from getOptions:', options);
            console.log('stringOptions:', stringOptions);
            console.log('=== END ORIENTATION NAME FIELD DEBUG ===');
          }

          // For Branch Type and City, render as read-only input fields instead of dropdowns
          if (field.name === "branchType" || field.name === "city") {
            return (
              <Inputbox
                label={field.label}
                id={field.id}
                name={field.name}
                placeholder={field.placeholder}
                value={fieldValue}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                error={meta.touched && meta.error}
                required={field.required}
                readOnly={true}
              />
            );
          }

          return field.type === "dropdown" ? (
            <Dropdown
              dropdownname={field.label}
              id={field.id}
              name={field.name}
              value={fieldValue}
              onChange={field.name === "branch" ? handleBranchChange : handleChange}
              results={stringOptions}
              required={field.required}
              disabled={loading}
              dropdownsearch={false}
            />
          ) : (
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
        }}
      </Field>
      {touched[field.name] && errors[field.name] && (
        <div className={styles.orientation_info_error}>
          {errors[field.name]}
        </div>
      )}
    </div>
  );
};

export default OrientationFormField;

