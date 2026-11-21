import "./Input.css";
function Input(props) {
  const { variant = "medium", type = "text", label, ...rest } = props;
  return (
    <label>
      <input
        placeholder={label}
        type={type}
        className={`input ${variant}`}
        {...rest}
      ></input>
    </label>
  );
}

export default Input;
