const Input = (props) => {
  const { label, type, name, onChange, onBlur, value } = props;

  return (
    <div className={props.className}>
      <label className="text-xl block font-medium text-teal-900">{label}</label>
      <input
        className="rounded-lg w-full bg-gray-50 border border-solid h-10 px-2 border-teal-900 focus-visin:outline-teal-900"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;
