import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import { useNavigate ,Link} from 'react-router-dom';
import { Container, TextField, Button, Typography, CircularProgress } from '@mui/material';
import axiosInstance from '../api/axiosInstance';
import {ToastContainer,toast} from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axiosInstance.post('/login', { email, password });
      dispatch(loginSuccess(res.data));
      navigate('/dashboard');
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" textAlign="center" marginTop={4}>Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" variant="contained" color="primary" fullWidth>{loading ? <CircularProgress size={24} /> : "Login"}</Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
        Don't have an account? <Link to="/register">Register</Link>
      </Typography>
      <ToastContainer/>
    </Container>
  );
};

export default Login;
