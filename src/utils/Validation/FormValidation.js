import validator from "validator";

function FormValidation({ fieldName, value }) {

  const regex = /[\w!@#&()$"{%}:;',?*~$^+=<>]/gi;

  switch (fieldName) {
    case "name":
      return {[fieldName]: value.length < 50 && value.length > 2};
    case "email":
      return {[fieldName]: validator.isEmail(value)};
    case "password":
      return {[fieldName]: regex.test(value)};
    default:
      return {};
  }
}

export default FormValidation;
