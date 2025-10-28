import { useState } from "react";
import { useNavigate ,Link } from "react-router-dom";
import phonePicture from "../assets/phone-picture.webp";
import googleLogo from "../assets/google_logo.webp";

const Login = () => {
  const isAuth = localStorage.getItem("isAuth") 
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    isAuth ? navigate("/homepage") : navigate("/signup")
  };

  return (
    <div className="flex items-center justify-center gap-10 px-10 py-10">
      <img 
        src={phonePicture}
        alt="Picture of Login" 
        className="w-180 sm:h-64  md:h-80 lg:h-96 xl:h-[500px] object-cover "
      />



      
      <form onSubmit={handleSubmit} className="space-y-6">
     <h2 className="font-bold text-xl md:text-2xl">Please enter your information to log in</h2>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name"
          className="w-full text-lg p-3 border-b-2 border-gray-300 focus:border-red-500 outline-none transition-colors"
          required
        />
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email"
          className="w-full text-lg p-3 border-b-2 border-gray-300 focus:border-red-500 outline-none transition-colors"
          required
        />
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password"
          className="w-full text-lg p-3 border-b-2 border-gray-300 focus:border-red-500 outline-none transition-colors"
          required
        />
        <button 
          type="submit"
          className="w-full bg-red-500 text-white text-center font-bold p-4 rounded-md hover:bg-red-600 transition-colors duration-200">Log in</button>

          <button className="w-full flex items-center text-center justify-center bg-white border border-gray-300 text-gray-700 font-bold p-4 rounded-md hover:bg-gray-50 transition-colors duration-200">
            <img src={googleLogo} alt="Logo of Google" className="w-5 m-2 md-hidden"/>
            Log in with Google
          </button>
                <p>Didn't have Accounr yet <Link to="/signup" className="text-blue-500 underline">Sign Up</Link></p>
      </form>

    </div>
  );
};

export default Login;
