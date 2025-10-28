import { useState } from "react"

const Login = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
      <>
      
        <img src="" alt="" />


      <form onSubmit={handleSubmit}>
        
        <input type="text"
         placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="text-center " 
          required/>
        <input type="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <input type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)} required/>

        <button type="submit">Submit</button>


      </form>
      
      </>
    )
}

export default Login