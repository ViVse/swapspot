import useInput from "../../hooks/use-input";
import { emailRule } from "../../utils/inputValidationRules";
import Input from "../../components/UI/Input";
import { Button } from "flowbite-react";
import { notEmptyRule } from "../../utils/inputValidationRules";
import { IoLogoGoogle } from "react-icons/io";
import axios from "../../config/axios";

import styles from "./Login.module.scss";

const Login = () => {
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
  } = useInput(notEmptyRule);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!emailIsValid || !passwordIsValid) return;

    const res = await axios.post("auth/login", {
      email: emailValue,
      password: passwordValue,
    });

    const { me } = res.data;
    console.log(me);

    resetEmail();
    resetPassword();
  };

  const googleAuthHandler = () => {
    window.location.href = `${process.env.REACT_APP_SERVER_URL}auth/google`;
  };

  return (
    <div
      className={`${styles.Login} bg-gradient-to-r from-green-400 to-teal-900 flex justify-center items-center`}>
      <form
        className="bg-white py-14 px-24 rounded-xl"
        onSubmit={submitHandler}>
        <h1 className="text-center text-3xl text-teal-900 font-bold">Вхід</h1>
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
              Пароль не може бути пустим
            </span>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <Button
            className="bg-teal-900 font-medium hover:bg-teal-700 mt-3"
            type="submit">
            Увійти
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

export default Login;
