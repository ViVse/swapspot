const Input = (props) => {
  const { label, placeholder, type, name, onChange, onBlur, value, required } = props;

  return (
    <div className={props.className}>
      <label className="text-xl block font-medium text-teal-900">{label}</label>
      <input
        className="rounded-lg w-full bg-gray-50 border border-solid h-10 px-2 mt-2 border-teal-900 focus-visin:outline-teal-900"
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
      />
    </div>
  );
};

export default Input;
