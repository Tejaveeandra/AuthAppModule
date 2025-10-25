// Field configurations for each payment mode
export const getPaymentFields = (selectedPaymentMode) => {
  switch (selectedPaymentMode) {
    case "Cash":
      return [
        { label: "Payment Date", name: "paymentDate", type: "date", placeholder: "Select Payment Date", required: true },
        { label: "Amount", name: "amount", type: "text", placeholder: "Enter Amount (numbers only)", required: true },
        { label: "Application Sale Date", name: "mainDdSaleDate", type: "date", placeholder: "Select Sale Date", required: true },
        { label: "Pre Printed Receipt No", name: "receiptNumber", type: "text", placeholder: "Enter Pre Printed Receipt No", required: true },
      ];
    case "DD":
      return [
        { label: "Payment Date", name: "mainDdPayDate", type: "date", placeholder: "Select Pay Date", required: true },
        { label: "Amount", name: "mainDdAmount", type: "text", placeholder: "Enter Amount (numbers only)", required: true },
        { label: "Application Sale Date", name: "mainDdSaleDate", type: "date", placeholder: "Select Sale Date", required: true },
        { label: "Pre Printed Receipt No", name: "mainDdReceiptNumber", type: "text", placeholder: "Enter Pre Printed Receipt No", required: true },
        { label: "Organisation Name", name: "mainDdOrganisationName", type: "dropdown", options: ["Option 1", "Option 2", "Option 3"], required: true },
        { label: "DD Number", name: "mainDdNumber", type: "text", placeholder: "Enter DD Number", required: true },
        { label: "City Name", name: "mainDdCityName", type: "dropdown", options: ["City 1", "City 2", "City 3"], required: true },
        { label: "Bank Name", name: "mainDdBankName", type: "dropdown", options: ["Bank 1", "Bank 2", "Bank 3"], required: true },
        { label: "Branch Name", name: "mainDdBranchName", type: "dropdown", options: ["Branch 1", "Branch 2", "Branch 3"], required: true },
        { label: "IFSC Code", name: "mainDdIfscCode", type: "text", placeholder: "Enter IFSC Code", required: true },
        { label: "DD Date", name: "mainDdDate", type: "date", placeholder: "Select DD Date", required: true },
      ];
    case "Cheque":
      return [
        { label: "Payment Date", name: "mainChequePayDate", type: "date", placeholder: "Select Pay Date", required: true },
        { label: "Amount", name: "mainChequeAmount", type: "text", placeholder: "Enter Amount (numbers only)", required: true },
        { label: "Application Sale Date", name: "mainChequeSaleDate", type: "date", placeholder: "Select Sale Date", required: true },
        { label: "Pre Printed Receipt No", name: "mainChequeReceiptNumber", type: "text", placeholder: "Enter Pre Printed Receipt No", required: true },
        { label: "Organisation Name", name: "mainChequeOrganisationName", type: "dropdown", options: ["Option 1", "Option 2", "Option 3"], required: true },
        { label: "Cheque Number", name: "mainChequeNumber", type: "text", placeholder: "Enter Cheque Number", required: true },
        { label: "City Name", name: "mainChequeCityName", type: "dropdown", options: ["City 1", "City 2", "City 3"], required: true },
        { label: "Bank Name", name: "mainChequeBankName", type: "dropdown", options: ["Bank 1", "Bank 2", "Bank 3"], required: true },
        { label: "Branch Name", name: "mainChequeBranchName", type: "dropdown", options: ["Branch 1", "Branch 2", "Branch 3"], required: true },
        { label: "IFSC Code", name: "mainChequeIfscCode", type: "text", placeholder: "Enter IFSC Code", required: true },
        { label: "Cheque Date", name: "mainChequeDate", type: "date", placeholder: "Select Cheque Date", required: true },
      ];
    case "Credit/Debit Card":
      return [
        { label: "Payment Date", name: "cardPayDate", type: "date", placeholder: "Select Payment Date", required: true },
        { label: "Amount", name: "cardAmount", type: "text", placeholder: "Enter Amount (numbers only)", required: true },
        { label: "Pre Printed Receipt No", name: "cardReceiptNumber", type: "text", placeholder: "Enter Pre Printed Receipt Number", required: true },
      ];
    default:
      return [];
  }
};
