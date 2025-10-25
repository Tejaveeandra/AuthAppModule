// Form field configurations
export const formFields = [
  {
    id: "firstName",
    name: "firstName",
    label: "First Name",
    placeholder: "Enter Name",
    type: "text",
    required: true
  },
  {
    id: "surname", 
    name: "surname",
    label: "Surname/Last Name",
    placeholder: "Enter Name",
    type: "text",
    required: true
  },
  {
    id: "aaparNo",
    name: "aaparNo", 
    label: "Aapar No",
    placeholder: "Enter aapar number",
    type: "text",
    required: true
  },
  {
    id: "dateOfBirth",
    name: "dateOfBirth",
    label: "Date Of Birth",
    placeholder: "DD/MM/YYYY",
    type: "date",
    required: true
  },
  {
    id: "aadharCardNo",
    name: "aadharCardNo",
    label: "Aadhar Card No",
    placeholder: "Enter aadhar no",
    type: "text",
    required: true
  },
  {
    id: "quota",
    name: "quota",
    label: "Quota/Admission Referred By",
    placeholder: "Select Quota",
    type: "dropdown",
    required: true,
    options: "quotaOptions"
  },
  {
    id: "employeeId",
    name: "employeeId",
    label: "Employee ID",
    placeholder: "Select Employee ID",
    type: "dropdown",
    required: true,
    options: "employeeIdOptions"
  },
  {
    id: "admissionType",
    name: "admissionType",
    label: "Admission Type",
    placeholder: "Name of the employee",
    type: "dropdown",
    required: true,
    options: "admissionTypeOptions"
  },
  {
    id: "proReceiptNo",
    name: "proReceiptNo",
    label: "PRO Receipt No",
    placeholder: "Enter Receipt No",
    type: "input",
    required: true
  },
  {
    id: "fatherName",
    name: "fatherName",
    label: "Father Name",
    placeholder: "Enter Father Name",
    type: "text",
    required: true
  },
  {
    id: "phoneNumber",
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter Phone Number",
    type: "text",
    required: true
  }
];

// Note: Dropdown options are now fetched dynamically from API
// The static options below are kept as fallback/example
export const admissionReferredByOptions = [
  { value: "employee1", label: "Employee 1" },
  { value: "employee2", label: "Employee 2" },
  { value: "employee3", label: "Employee 3" }
];



export const admissionTypeOptions = [
  { value: "regular", label: "Regular" },
  { value: "lateral", label: "Lateral" },
  { value: "direct", label: "Direct" },
  { value: "transfer", label: "Transfer" },
  { value: "withPro", label: "with pro" }
 ];

// Initial form values
export const initialValues = {
  firstName: "",
  surname: "",
  gender: "",
  aaparNo: "",
  dateOfBirth: "",
  aadharCardNo: "",
  proReceiptNo: "",
  admissionReferredBy: "",
  quota: "",
  admissionType: "",
  fatherName: "",
  phoneNumber: "",
  profilePhoto: null
};
