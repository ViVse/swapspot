const Input = (props) => {
  const { label, type, name, handleChange, errorMessage, isValid, value } =
    props;

  return (
    <div>
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={handleChange} />
      {errorMessage && !isValid && <span>{errorMessage}</span>}
    </div>
  );
};

export default Input;
