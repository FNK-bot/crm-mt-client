import React, { useState } from "react";
import { registerUser } from "../api/registerApi";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Typography, Container, Box, CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");


    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      await registerUser(formData.name, formData.email, formData.password);
      toast.success("Registration Successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.msg || "Registration Failed");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h4">Register</Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
        />

        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Register"}
        </Button>
      </form>

      <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
        Already have an account? <Link to="/login">Login</Link>
      </Typography>

      <ToastContainer />
    </Container>
  );
};

export default Register;
