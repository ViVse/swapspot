/**
 * creates and returns a validation rule object that
 * is used by useForm hook to validate the form inputs
 *
 * @param {string} ruleName - name of the validation rule
 * @param {string} errorMessage - message to display
 * @param {function} validateFunc - validation function
 */
function createValidationRule(ruleName, errorMessage, validateFunc) {
  return {
    name: ruleName,
    message: errorMessage,
    validate: validateFunc,
  };
}

export function requiredRule(inputName) {
  return createValidationRule(
    "required",
    `${inputName} required`,
    (inputValue, formObj) => inputValue.length !== 0
  );
}

export function minLengthRule(inputName, minCharacters) {
  return createValidationRule(
    "minLength",
    `Найменша довжина ${inputName} повинна бути ${minCharacters}`,
    (inputValue, formObj) => inputValue.length >= minCharacters
  );
}

export function maxLengthRule(inputName, maxCharacters) {
  return createValidationRule(
    "minLength",
    `Максимальна допустима довжина ${inputName} ${maxCharacters}`,
    (inputValue, formObj) => inputValue.length <= maxCharacters
  );
}

export function emailRule(inputName) {
  return createValidationRule(
    "email",
    `${inputName} повинен бути поштою`,
    (inputValue, formObj) => inputValue.includes("@")
  );
}

export function passwordMatchRule() {
  return createValidationRule(
    "passwordMatch",
    `Паролі не співпадають`,
    (inputValue, formObj) => inputValue === formObj.password.value
  );
}
