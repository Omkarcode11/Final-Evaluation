// LoginForm.tsx
import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import styles from "./LoginForm.module.css";
import axios from "axios";
import { BASE_URL } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";
import { context } from "../../context/MyContextApp";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginForm: React.FC = () => {
  const ctx = useContext(context);

  if (!ctx) {
    throw new Error("SomeComponent must be used within a MyContextApp");
  }

  const { setUser } = ctx;
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

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
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log(formData);
      let res = await axios.post(BASE_URL + "/api/auth/login", formData);
      if (res.status == 200) {
        let token: { token: string } = res.data;
        setUser({
          email: formData.email,
          isAuthorize: true,
          username: res.data.username,
        });
        localStorage.setItem("quiz_builder", token.token);
        navigate("/dashboard");
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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

      <button type="submit" className={styles.submitButton}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
