import useInput from "../../hooks/use-input";
import { emailRule, minLengthRule } from "../../utils/inputValidationRules";
import Input from "../../components/UI/Input";
import { Button } from "flowbite-react";
import { notEmptyRule } from "../../utils/inputValidationRules";
import { IoLogoGoogle } from "react-icons/io";
import axios from "../../config/axios";

import styles from "./SignUp.module.scss";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(notEmptyRule);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(emailRule);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(minLengthRule(6));

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!emailIsValid || !passwordIsValid || !nameIsValid) return;

    await axios.post("auth/register", {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    });

    resetName();
    resetEmail();
    resetPassword();

    navigate("/login");
  };

  const googleAuthHandler = () => {
    window.location.href = `${process.env.REACT_APP_SERVER_URL}auth/google`;
  };

  return (
    <div
      className={`${styles.SignUp} bg-gradient-to-r from-green-400 to-teal-900 flex justify-center items-center`}>
      <form
        className="bg-white py-14 px-24 rounded-xl"
        onSubmit={submitHandler}>
        <h1 className="text-center text-3xl text-teal-900 font-bold">
          Реєстрація
        </h1>
        <div className="mt-3">
          <Input
            label="Ім'я"
            value={nameValue}
            hasError={nameHasError}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameHasError && (
            <span className="block text-red-800">Ім'я не може бути пустим</span>
          )}
        </div>
        <div className="mt-3">
          <Input
            label="Email"
            value={emailValue}
            hasError={emailHasError}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && (
            <span className="block text-red-800">Введіть правильну пошту</span>
          )}
        </div>
        <div className="mt-3">
          <Input
            className="w-72"
            type="password"
            label="Пароль"
            value={passwordValue}
            hasError={passwordHasError}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordHasError && (
            <span className="block text-red-800">
              Мінімальна довжина 6 символів
            </span>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <Button
            className="bg-teal-900 font-medium hover:bg-teal-700 mt-3"
            type="submit">
            Зареєструватись
          </Button>
          <Button
            className="bg-white border border-solid !border-teal-900 !text-teal-900 font-medium hover:bg-green-300 mt-3"
            type="button"
            onClick={googleAuthHandler}>
            <IoLogoGoogle className="mr-2" /> Увійти через Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
