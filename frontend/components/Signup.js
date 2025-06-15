import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", address: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", formData);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input name="name" placeholder="Name" required minLength={3} onChange={handleChange} />
      <input name="email" placeholder="Email" type="email" required onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" required onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Signup;
