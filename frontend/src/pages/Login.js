import { React, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message || error) {
      const timeoutId = setTimeout(() => {
        setMessage(null);
        setError(null);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [message, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setMessage("Login Successful");
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      console.log(json);
      navigate("/");
    }
  };
  return (
    <form className="login" onSubmit={handleSubmit}>
    <h3>Log In</h3>
    
    <label>Email address:</label>
    <input 
      type="email" 
      onChange={(e) => setEmail(e.target.value)} 
      value={email} 
    />
    <label>Password:</label>
    <input 
      type="password" 
      onChange={(e) => setPassword(e.target.value)} 
      value={password} 
    />

    <button>Log in</button>
    {error && <div className="error">{error}</div>}
  </form>
  );
};

export default Login;
