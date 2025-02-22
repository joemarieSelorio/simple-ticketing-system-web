import PropTypes from "prop-types";

const TextFieldInput = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`appearance-none block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${className}`}
      />
    </div>
  );
};

TextFieldInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default TextFieldInput;
