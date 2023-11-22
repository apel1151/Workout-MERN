import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

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
    console.log(user);
    const response = await fetch("/api/user/signup", {
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
      setEmail("");
      setPassword("");
      setError(null);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN", payload: json });
      setMessage("User sign up successfully");
      navigate("/login");
    }
  };
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

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

      <button>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
