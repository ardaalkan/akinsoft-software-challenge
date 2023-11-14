// components/SelectField.js
import Select from "react-select";

const SelectCategory = ({ label, options, onChange, value, noOptionsMessage }) => {
  return (
    <label>
      <span>{label}:</span>
      <Select
        required
        options={options}
        onChange={onChange}
        value={value}
        noOptionsMessage={noOptionsMessage}
      />
    </label>
  );
};

export default SelectCategory;