import React from "react"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [remember,setRemember]=useState(false);
  const [error,setError]=useState("");
  const {login}=useAuth();
  const navigate=useNavigate();

  const handleSubmit=e=>{
    e.preventDefault();
    if(!email||!password) return setError("All fields required");
    const success=login(email,password,remember);
    if(success) navigate("/board");
    else setError("Invalid credentials");
  };

  return (
    <div style={{padding:50}}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><br/><br/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /><br/><br/>
        <label>
          <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} />
          Remember Me
        </label><br/><br/>
        <button>Login</button>
      </form>
      {error && <p style={{color:"red"}}>{error}</p>}
    </div>
  );
}
