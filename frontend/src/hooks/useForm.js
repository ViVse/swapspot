import { useState, useCallback } from "react";
import Input from "../components/UI/Input";

function useForm(formObj) {
  const [form, setForm] = useState(formObj);

  function renderFormInputs() {
    return Object.values(form).map((inputObj) => {
      const { value, label, errorMessage, valid, renderInput } = inputObj;
      return renderInput(onInputChange, value, valid, errorMessage, label);
    });
  }

  const isInputFieldValid = useCallback(
    (inputField) => {
      for (const rule of inputField.validationRules) {
        if (!rule.validate(inputField.value, form)) {
          inputField.errorMessage = rule.message;
          return false;
        }
      }

      return true;
    },
    [form]
  );

  const onInputChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      // copy input object whose value was changed
      const inputObj = { ...form[name] };
      // update value
      inputObj.value = value;

      // update input field's validity
      const isValidInput = isInputFieldValid(inputObj);
      // if input is valid and it was previously set to invalid
      // set its valid status to true
      if (isValidInput && !inputObj.valid) {
        inputObj.valid = true;
      } else if (!isValidInput && inputObj.valid) {
        // if input is not valid and it was previously valid
        // set its valid status to false
        inputObj.valid = false;
      }

      // mark input field as touched
      inputObj.touched = true;
      setForm({ ...form, [name]: inputObj });
    },
    [form, isInputFieldValid]
  );

  /**
   * returns boolean value indicating whether overall form is valid
   *
   * @param {object} formObj - object representation of a form
   */
  const isFormValid = useCallback(() => {
    let isValid = true;
    const arr = Object.values(form);

    for (let i = 0; i < arr.length; i++) {
      if (!arr[i].valid) {
        isValid = false;
        break;
      }
    }

    return isValid;
  }, [form]);

  return { renderFormInputs, isFormValid };
}

/**
 * creates and returns object representation of form field
 *
 * @param {string} label - label to show with the form input
 * @param {string} name - input name
 * @param {string} type - input type
 * @param {string} defaultValue - default value for the input
 */
export function createFormFieldConfig(label, name, type, defaultValue = "") {
  return {
    renderInput: (handleChange, value, isValid, error, key) => {
      return (
        <Input
          key={key}
          name={name}
          type={type}
          label={label}
          isValid={isValid}
          value={value}
          handleChange={handleChange}
          errorMessage={error}
        />
      );
    },
    label,
    value: defaultValue,
    valid: false,
    errorMessage: "",
    touched: false,
  };
}

export default useForm;
