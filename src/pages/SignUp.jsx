import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format.";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);

    if (validateForm()) {
      console.log("✅ Form Data:", formData);
      setSuccess(true);
    } else {
      console.log("❌ Form validation failed");
    }
  };
  const GoogleIcon = () => (
    <svg
      className="w-5 h-5 mr-3"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  );
  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-12">
        <img
          src="/./src/assets/phone-picture.webp"
          alt="E-commerce illustration with shopping cart"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/./src/assets/phone-picture.webp";
            e.currentTarget.alt = "Placeholder for e-commerce image";
          }}
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-gray-900">
            Create an account
          </h1>
          <p className="text-gray-600 mt-2 mb-8">Enter your details below</p>

          {success && (
            <p className="text-green-600 bg-green-100 p-3 rounded-lg text-center font-medium mb-4">
              ✅ Signup successful!
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                aria-label="Name"
                className="w-full text-lg p-3 border-b-2 border-gray-300 focus:border-red-500 outline-none transition-colors"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                aria-label="Email"
                className="w-full text-lg p-3 border-b-2 border-gray-300 focus:border-red-500 outline-none transition-colors"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                aria-label="Password"
                className="w-full text-lg p-3 border-b-2 border-gray-300 focus:border-red-500 outline-none transition-colors"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                aria-label="Confirm Password"
                className="w-full text-lg p-3 border-b-2 border-gray-300 focus:border-red-500 outline-none transition-colors"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white font-bold p-4 rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              Create Account
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-bold p-4 rounded-md hover:bg-gray-50 transition-colors duration-200"
>
              <GoogleIcon />
              Sign up with Google
            </button>
          </form>
          <p className="text-center text-gray-600 mt-8">
            Already have account?{" "}
            <Link to="/login" className="text-red-500 font-medium hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;



