import React, { useState } from "react";

interface LoginFormProps {
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onSwitchToSignUp }) => {
  const [form, setForm] = useState({
    identifier: "", // email or phone
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.identifier) newErrors.identifier = "Email or phone is required";
    if (!form.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative animate-fade-in">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-indigo-600 text-xl font-bold"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Login</h2>
      {submitted ? (
        <div className="text-green-600 text-center font-semibold py-8">
          Login successful! 🎉
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email or Phone</label>
            <input
              type="text"
              name="identifier"
              value={form.identifier}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.identifier ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.identifier && (
              <div className="text-red-500 text-sm mt-1">
                {errors.identifier}
              </div>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.password ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="text-indigo-600 hover:underline text-sm"
              onClick={() =>
                alert("Forgot password functionality not implemented yet.")
              }
            >
              Forgot password?
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-all font-semibold"
            >
              Login
            </button>
          </div>
        </form>
      )}
      <div className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <button
          className="text-indigo-600 hover:underline font-semibold"
          onClick={onSwitchToSignUp}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
