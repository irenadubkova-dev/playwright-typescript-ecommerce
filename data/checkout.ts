export const checkoutData = {
  validCustomer: {
    firstName: "Irina",
    lastName: "Test",
    postalCode: "12345",
  },
};

export const checkoutNegativeTestData = [
  {
    testName: "checkout fails when first name is missing",
    firstName: "",
    lastName: checkoutData.validCustomer.lastName,
    postalCode: checkoutData.validCustomer.postalCode,
    error: "First Name is required",
  },
  {
    testName: "checkout fails when last name is missing",
    firstName: checkoutData.validCustomer.firstName,
    lastName: "",
    postalCode: checkoutData.validCustomer.postalCode,
    error: "Last Name is required",
  },
  {
    testName: "checkout fails when postal code is missing",
    firstName: checkoutData.validCustomer.firstName,
    lastName: checkoutData.validCustomer.lastName,
    postalCode: "",
    error: "Postal Code is required",
  },
];
