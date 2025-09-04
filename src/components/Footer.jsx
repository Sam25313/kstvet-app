import React, { useState } from "react";
import axios from "axios";

import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutubeSquare } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("loading");
    setError("");

    if (!email || !email.includes("@")) {
      setStatus("error");
      setError("Please enter a valid email address.");
      setTimeout(() => {
        setStatus("");
        setError("");
      }, 5000);
      return;
    }
    setStatus("loading");
    try {
    const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/subscribe`,
  { email }
);

      if (response.status === 200) {
        setStatus("success");
        setEmail("");
        setTimeout(() => {
          setStatus("");
        }, 5000);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
      setTimeout(() => {
        setStatus("");
        setError("");
      }, 5000);
    }
  };
  return (
    <div className="text-gray-500/80 pt-8 px-6 mt-18 md:px-16 lg:px-24 xl:px-32 bg-gray-950">
      <div className="flex flex-wrap justify-between gap-12 md:gap-6">
        <div className="max-w-80">
          <h1 className="mb-4 h-8 md:h-9">Our Socials</h1>
          <p className="text-sm">Follow us on our Social Media platforms</p>
          <div className="flex items-center gap-3 mt-4">
            <a href="#">
              <FaInstagramSquare />
            </a>

            <a href="#">
              <FaFacebook />
            </a>

            <a href="#">
              <FaTwitter />
            </a>

            <a href="#">
              <FaYoutubeSquare />
            </a>
          </div>
        </div>

        <div>
          <p className="text-lg text-white-800">Quick Links</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/ministries">Ministries</a>
            </li>
            <li>
              <a href="/sermons">Sermons</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="max-w-80">
          <p className="text-lg text-white-800">STAY UPDATED</p>
          <p className="mt-3 text-sm">
            Subscribe to our newsletter to get updated With the latest events.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center mt-4">
              <input
                type="email" // Use type="email" for better validation and UX
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white rounded-l border border-gray-300 h-9 px-3 outline-none"
                placeholder="Your email"
              />
              <button
                type="submit"
                disabled={status === "loading"} // Disable button during submission
                className="flex items-center justify-center bg-orange h-9 w-9 aspect-square rounded-r"
              >
                {/* Arrow icon */}
                <svg
                  className="w-4 h-4 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
              </button>
            </div>
            {status === "loading" && (
              <p className="text-sm text-gray-400 mt-2">Subscribing...</p>
            )}
            {status === "success" && (
              <p className="text-sm text-green-500 mt-2">Subscription Added!</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-500 mt-2">
                Subscription failed. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
      <hr className="border-gray-300 mt-8" />
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p>
          © {new Date().getFullYear()} <a href="#">Kstvetcu</a>. All rights
          reserved.
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>
            <a href="#">Sitemap</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
