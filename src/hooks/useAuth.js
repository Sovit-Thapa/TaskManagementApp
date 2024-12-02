import { useState } from "react";
import { loginUser, signupUser } from "../services/authService";

const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (onSuccess) => {
    if (email && password) {
      try {
        await loginUser(email, password);
        onSuccess();
      } catch (err) {
        setError("Invalid credentials. Please try again.");
      }
    } else {
      setError("Both fields are required.");
    }
  };

  const handleSignup = async (onSuccess) => {
    if (email && password && displayName) {
      try {
        await signupUser(email, password, displayName);
        onSuccess();
      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          setError("This email is already in use. Please try a different one.");
        } else if (err.code === "auth/invalid-email") {
          setError("The email address is not valid.");
        } else if (err.code === "auth/weak-password") {
          setError("The password is too weak. Please use a stronger password.");
        } else {
          setError("An error occurred. Please try again.");
        }
      }
    } else {
      setError("All fields are required.");
    }
  };

  return {
    email,
    password,
    displayName,
    error,
    setEmail,
    setPassword,
    setDisplayName,
    setError,
    handleLogin,
    handleSignup,
  };
};

export default useAuth;
