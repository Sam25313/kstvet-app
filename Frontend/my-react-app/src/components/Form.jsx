import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

const Form = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:5000/api/registration", data);
      toast.success("Registration Successful! Welcome aboard.", {
        duration: 5000,
      });

      reset();
    } catch (error) {
      toast.error("Something went Wrong. Please try again");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left items-center justify-center text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-600">
          MemberShip Registration Form
        </h2>
        <div>
          <label>
            Name:
            <input
              onChange={handleChange}
              className="w-full border mt-1 bg-green-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
              placeholder="Please enter your name"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Name can only contain letters and spaces",
                },
              })}
            />
          </label>
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label>
            Email:
            <input
              type="email"
              onChange={handleChange}
              className="w-full border mt-1 bg-green-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
              placeholder="Please enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
            />
          </label>
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>
            Phone:
            <input
              type="tel"
              onChange={handleChange}
              className="w-full border mt-1 bg-green-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
              placeholder="Please enter your phone number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
            />
          </label>
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full font-semibold py-2 rounded transition ${
            isSubmitting
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-[#0A2342] hover:bg-green-300"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Registration"}
        </button>
      </form>
    </section>
  );
};

export default Form;
