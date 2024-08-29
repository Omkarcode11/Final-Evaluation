// LoginForm.tsx
import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import styles from "./LoginForm.module.css";
import axios from "axios";
import { BASE_URL } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";
import { context } from "../../context/MyContextApp";
import Spinner from "../../spinner/Spinner";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginForm: React.FC = () => {
  const ctx = useContext(context);

  if (!ctx) {
    throw new Error("LoginForm must be used within a MyContextApp");
  }

  const { setUser } = ctx;
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (): FormErrors => {
    let validationErrors: FormErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Invalid Email";
    }
    if (formData.password.length < 6) {
      validationErrors.password = "Weak password";
    }
    return validationErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
    } else {
      try {
        const res = await axios.post(BASE_URL + "/api/auth/login", formData);
        if (res.status === 200) {
          const { token, username } = res.data;
          setUser({
            email: formData.email,
            isAuthorize: true,
            username,
          });
          localStorage.setItem("quiz_builder", token);
          navigate("/dashboard");
        }
      } catch (error) {
        setErrors({
          general:
            error.response?.data?.message || "Something went wrong. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {errors.general && <div className={styles.errorText}>{errors.general}</div>}

      <div className={styles.formGroup}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? styles.inputError : ""}
        />
      </div>
      {errors.email && <div className={styles.errorText}>{errors.email}</div>}

      <div className={styles.formGroup}>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? styles.inputError : ""}
        />
      </div>
      {errors.password && (
        <div className={styles.errorText}>{errors.password}</div>
      )}

      <button type="submit" className={styles.submitButton} disabled={isLoading}>
        {isLoading ? <Spinner  borderWidth="2px" color="white" size="1.5rem"/> : "Login"}
      </button>
    
    </form>
  );
};

export default LoginForm;
