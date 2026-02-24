import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import AuthBackground from "../components/AuthBackground";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // set display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      navigate("/dashboard"); // change to your home page
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <AuthBackground>
      <form
        onSubmit={handleSignUp}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          width: "70%",
        }}
      >
        <div style={{ 
          fontSize: "36px", 
          color: "#6b4032", 
          textAlign: "center", 
          marginBottom: "14px",
        }}>
          sign up!
        </div>

        <input
          type="text"
          placeholder="first + last name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          let's shelve!
        </button>

        {error && (
          <p style={{ color: "red", fontSize: "12px" }}>{error}</p>
        )}

        <p style={{ textAlign: "center", color: "#6b4032" }}>
          shelved before? <Link to="/login">log in</Link>
        </p>
      </form>
    </AuthBackground>
  );
};

const inputStyle: React.CSSProperties = {
  borderRadius: "999px",
  padding: "20px",
  border: "2px solid #6b4032",
  backgroundColor: "#F4EFE6",
  outline: "none",
};

const buttonStyle: React.CSSProperties = {
  borderRadius: "999px",
  padding: "20px",
  border: "none",
  backgroundColor: "#6b4032",
  color: "#F4EFE6",
  fontWeight: "bold",
  fontSize: "28px",
  cursor: "pointer",
};

export default SignUp;