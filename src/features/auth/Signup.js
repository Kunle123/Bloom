import React, { useState, useEffect } from "react";
import { signupUser } from "../../lib/authService";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  role: z.literal("Mother"),
});

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Mother",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = "Sign Up - Bloom";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = signupSchema.safeParse(form);

    if (!result.success) {
      const formatted = result.error.format();
      setErrors({
        email: formatted.email?._errors?.[0] || "",
        password: formatted.password?._errors?.[0] || "",
      });
      return;
    }
    try {
      const userCredential = await signupUser(form.email, form.password);
      console.log("✅ Firebase user created:", userCredential.user);
      navigate("/home-mother");
    } catch (error) {
      console.error("Signup error:", error.message);
      setErrors((prev) => ({ ...prev, firebase: error.message }));
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "2rem" }}>
      <h2>Create Your Bloom Account</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Full Name (optional)</label>
          <br />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
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
        <p>
          <em>
            Role is defaulted to "Mother". Midwife accounts are created by
            admins only.
          </em>
        </p>
        <button type="submit">Sign Up as Mother</button>
      </form>
      {errors.firebase && <p style={{ color: "red" }}>{errors.firebase}</p>}

      <p>
        Already have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Log in
        </span>
      </p>
    </div>
  );
}

export default Signup;
