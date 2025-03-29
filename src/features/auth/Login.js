import React, { useState, useEffect } from "react";
import { loginUser } from "../../lib/authService";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = "Login - Bloom";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = loginSchema.safeParse(form);

    if (!result.success) {
      const formatted = result.error.format();
      setErrors({
        email: formatted.email?._errors?.[0] || "",
        password: formatted.password?._errors?.[0] || "",
      });
      return;
    }
    try {
      const userCredential = await loginUser(form.email, form.password);
      console.log("✅ Firebase login success:", userCredential.user);
      navigate("/home-mother");
    } catch (error) {
      console.error("Login error:", error.message);
      setErrors((prev) => ({ ...prev, firebase: error.message }));
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "2rem" }}>
      <h2>Login to Bloom</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email *</label>
          <br />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Password *</label>
          <br />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
      {errors.firebase && <p style={{ color: "red" }}>{errors.firebase}</p>}

      <p>
        Don’t have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/signup")}
        >
          Sign up
        </span>
      </p>
    </div>
  );
}

export default Login;
