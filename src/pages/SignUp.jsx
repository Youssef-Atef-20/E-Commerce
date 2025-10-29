import React, { useState } from "react";
import { useNavigate ,Link } from "react-router-dom";
import phonePicture from "../assets/phone-picture.webp";
import googleLogo from "../assets/google_logo.webp";

    

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem("email");

    if (email === storedEmail) {
      setShowEmailError(true);
      
      setTimeout(() => {
        setShowEmailError(false);
      }, 3000);

      return;
    }
    
    if (password !== confirmPassword) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return; 
    }
    
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    
    window.location.href = "/";
  };

  return (
    
    <div className="min-h-screen w-full flex bg-white font-sans relative">
      
      
      {showError && (
        <div 
          className="fixed top-10 left-1/2 -translate-x-1/2 z-50 
                     bg-red-600 text-white font-semibold 
                     px-6 py-3 rounded-lg shadow-xl"
        >
          Passwords do not match!
        </div>
      )}
      
      {showEmailError && (
        <div 
          className="fixed top-10 left-1/2 -translate-x-1/2 z-50 
                     bg-blue-600 text-white font-semibold 
                     px-6 py-3 rounded-lg shadow-xl max-w-sm text-center"
        >
          This email is already used. Try logging in.
        </div>
      )}

      <div className="hidden md:flex md:w-1/2 items-center justify-center p-12 bg-gray-100">
        <img
          src={phonePicture}
          alt="E-commerce illustration"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-gray-900">Create an account</h1>
          <p className="text-gray-600 mt-2 mb-8">Enter your details below</p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="w-full text-lg p-3 border-b-2 border-gray-300 focus:border-red-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full text-lg p-3 border-b-2 border-gray-300 focus:border-red-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full text-lg p-3 border-b-2 border-gray-300 focus:border-red-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full text-lg p-3 border-b-2 border-gray-300 focus:border-red-500 outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-red-500 text-white font-bold p-4 rounded-md hover:bg-red-600"
            >
              Create Account
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-bold p-4 rounded-md hover:bg-gray-50"
            >
              <img src={googleLogo} alt="Google" className="w-5 h-5 mr-3" />
              Sign up with Google
            </button>
          </form>
          <p className="text-center text-gray-600 mt-8">
            Already have account?{" "}
            <a href="/login" className="text-red-500 font-medium hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;


