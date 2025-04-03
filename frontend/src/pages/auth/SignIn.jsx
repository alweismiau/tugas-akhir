import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import Validation from "./SignInValidation";
import axios from "../../api/api";
import CustomContainer from "../../components/container/CustomContainer";
import FormHead from "../../components/auth/FormHead";
import FormFields from "../../components/auth/FormFields";
import CardContainer from "../../components/card/CardContainer";
import CustomButton from "../../components/button/CustomButton";

const Signin = () => {
  const [user, setUser] = useState({
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
        const response = await axios.post("/signin", user);

        if (response.status === 200 && response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.user.id);
          console.log("user id", response.data.user.id);
          alert("Login Successful!");
          console.log("Login Successful!");
          navigate("/dashboard");
        } else {
          setServerError(response.data.message || "Login failed");
        }
      } catch (error) {
        if (error.response) {
          setServerError(
            error.response.data.message || "Invalid email or password"
          );
        } else {
          setServerError("Network error, please try again later.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
   <CustomContainer>
      <CardContainer>
        <FormHead
          variant="sign-in"
          title="Masuk Akun"
          href="/signup"
          sx={{ mb: 4, textAlign: "center" }}
        />

        {serverError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <FormFields
            fields={[
              { name: "email", label: "Alamat Email", type: "email" },
              { name: "password", label: "Password", type: "password" },
            ]}
            values={user}
            handleChange={handleInput}
            errors={errors}
            />
          <CustomButton
            sx={{ mt: 2 }}
            type="submit"
            text={loading ? "Sedang masuk..." : "Masuk"}
            disabled={loading}
          />
        </form>
      </CardContainer>
    </CustomContainer>
  );
};

export default Signin;
