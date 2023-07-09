import React, { useState } from 'react';
import "../Style/loginStyle.css"
import Firebase from '../firebase'; 
import {useNavigate} from 'react-router-dom';
import {signInWithEmailAndPassword } from "firebase/auth";

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();



  const handleSignIn = async (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(Firebase, email, password)
    .then(() => {
      navigate('/admin');
    })
    .catch((error) => {
      if (error.code === "auth/wrong-password") {
        alert("Invalid password");
      } else if (error.code === "auth/user-not-found") {
        alert("User not authorized please Contact the Owner!!! ");
      } else {
        alert(error.code);
      }
    });
 
    }
    

  return (
    <div className="box">
    <h2>Sign In</h2>
    <form onSubmit={handleSignIn}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleSignIn}>Sign In</button>
    </form>
  </div>
  );
}

export default SignInForm;