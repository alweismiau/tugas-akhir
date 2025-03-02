  import React, { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    Alert,
  } from "@mui/material";
  import Validation from "./SignUpValidation";
  import axios from "../../api/api";

  const Signup = () => {
    const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();

    
    const handleInput = (event) => {
      setUser((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    };

    
    const handleSubmit = async (event) => {
      event.preventDefault();
      const validationErrors = Validation(user);
      setErrors(validationErrors);
      setServerError(""); 
  
      
      if (Object.keys(validationErrors).length === 0) {
        setLoading(true);
        try {
          const response = await axios.post("/signup", user);
          alert(response.data.message); 
          navigate("/signin"); 
        } catch (error) {
          setServerError(error.response?.data?.message || "Something went wrong");
        } finally {
          setLoading(false);
        }
      }
    };

    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url('/image.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container
          component={Paper}
          elevation={6}
          sx={{
            p: 4,
            maxWidth: 400,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <Typography variant="h5" textAlign="center" fontWeight="bold" gutterBottom>
            Sign Up
          </Typography>
          <Typography variant="body2" textAlign="center" sx={{ mb: 2 }}>
            Already have an account?{" "}
            <Link to="/signin" style={{ textDecoration: "none", color: "blue" }}>
              Sign in
            </Link>
          </Typography>

          {serverError && <Alert severity="error" sx={{ mb: 2 }}>{serverError}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.name}
              onChange={handleInput}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
            <TextField
              label="Email Address"
              name="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.email}
              onChange={handleInput}
              error={!!errors.email}
              helperText={errors.email}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.password}
              onChange={handleInput}
              error={!!errors.password}
              helperText={errors.password}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
        </Container>
      </Box>
    );
  };

  export default Signup;
