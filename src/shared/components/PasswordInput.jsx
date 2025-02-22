import { useState } from "react";
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";
import PropTypes from "prop-types";

const PasswordInput = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <LockIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${className}`}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        ) : (
          <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        )}
      </button>
    </div>
  );
};

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default PasswordInput;
