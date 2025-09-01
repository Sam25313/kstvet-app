import React from "react";
import { useLogin, useNotify, useRedirect } from "react-admin";
import { useState } from "react";
import backgroundImage from "../../assets/Background7.webp";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const login = useLogin();
  const notify = useNotify();
  const redirect = useRedirect();
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formState.username) {
      newErrors.username = "Username is required";
    }
    if (!formState.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    try {
      await login(formState);
      redirect("/admin");
    } catch (error) {
    notify(error.message || "Login failed", { type: "error" });
  setErrors({ general: error.message }); 
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-[#3c2a2a] px-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/70 text-white-500 max-w-[350px] mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Login Now
        </h2>
        <div>
          <input
            name="username"
            type="text"
            value={formState.username}
            onChange={(e) =>
              setFormState({ ...formState, username: e.target.value })
            }
            placeholder="Username"
            className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
        </div>

        <div style={{ position: "relative" }}>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formState.password}
            onChange={(e) =>
              setFormState({ ...formState, password: e.target.value })
            }
            className="w-full border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            placeholder="Password"
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <div className="text-right py-4">
          <a className="text-orange-600 underline" href="/forgot-password">
            Forgot Password
          </a>
        </div>
        {errors.general && (
  <p className="text-red-500 text-sm mb-3">{errors.general}</p>
)}
        <button
          type="submit"
          className="w-full mb-3 bg-orange-500 hover:bg-orange-600/90 active:scale-95 transition py-2.5 rounded-full text-white"
        >
          Log in
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
