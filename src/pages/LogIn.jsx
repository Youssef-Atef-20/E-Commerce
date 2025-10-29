import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import phonePicture from "../assets/phone-picture.webp";
import googleLogo from "../assets/google_logo.webp";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const storedEmail = localStorage.getItem("email");
  const storedPassword = localStorage.getItem("password");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });

      const data = await res.json();

      localStorage.setItem("isAuth", "true");
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);

      navigate("/");
    },
    onError: () => console.log("Google Login Failed"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === storedEmail && password === storedPassword) {
      localStorage.setItem("isAuth", "true");
      navigate("/");
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans relative">

      {/* Error */}
      {showError && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-xl">
          Incorrect Email or Password!
        </div>
      )}

      {/* Image */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-12 bg-gray-100">
        <img
          src={phonePicture}
          alt="Login Illustration"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-gray-900">Log in to Hot Deals</h1>
          <p className="text-gray-600 mt-2 mb-8">Enter your details below</p>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <button
              type="submit"
              className="w-full bg-red-500 text-white font-bold p-4 rounded-md hover:bg-red-600"
            >
              Log In
            </button>

            {/* Google Login */}
            <button
              type="button"
              onClick={() => googleLogin()}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md p-3 hover:bg-gray-50 transition"
            >
              <img src={googleLogo} className="w-5 h-5" alt="Google" />
              <span className="text-gray-700 font-medium">Sign in with Google</span>
            </button>
          </form>

          <p className="text-center text-gray-600 mt-8">
            Don’t have an account?
            <Link to="/signup" className="text-red-500 font-medium hover:underline ml-1">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
