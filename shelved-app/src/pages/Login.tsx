import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import AuthBackground from "../components/AuthBackground";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError("Invalid email or password");
    }
  };

  return (
    <AuthBackground>
      <form
        onSubmit={handleLogin}
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
          welcome back
        </div>

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
          see my shelf!
        </button>

        {error && (
          <p style={{ color: "red", fontSize: "12px" }}>{error}</p>
        )}

        <p style={{ textAlign: "center", color: "#6b4032" }}>
          first time? <Link to="/signup">sign up</Link>
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

export default Login;