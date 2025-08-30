import React, { useState } from "react";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("A password reset link has been sent to your email.");
      } else {
        setMessage("Failed to send reset email. Please check your email address.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">Forgot Password</h2>
        <p className="mb-4 text-sm text-gray-600 text-center">Enter your email to receive a password reset link.</p>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-full py-2 px-4 mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Send Reset Link
        </button>
        {message && <p className="mt-4 text-sm text-center text-red-500">{message}</p>}
      </form>
    </section>
  );
};

export default ForgotPasswordForm;