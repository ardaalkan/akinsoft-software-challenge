const InputField = ({ label, type, name, value, onChange, required }) => {
  return (
    <label>
      <span>{label}:</span>
      {type === "textarea" ? (
        <textarea
          required={required}
          name={name}
          onChange={onChange}
          value={value}
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          onChange={onChange}
          value={value}
        ></input>
      )}
    </label>
  );
};

export default InputField;