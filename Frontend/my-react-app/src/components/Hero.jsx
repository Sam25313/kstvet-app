import axios from "axios";
import React, { useState, useEffect } from "react";
import Background from "../assets/Background.jpg";
import { Link } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import Modal from "react-modal";

import Background1 from "../assets/Background1.jpg";
import Background2 from "../assets/Background2.webp";
import Background4 from "../assets/Background4.jpg";
import Background5 from "../assets/Background5.png";
import Background6 from "../assets/Background6.jpg";

Modal.setAppElement("#root");

const images = [
  Background1,
  Background2,
  Background4,
  Background5,
  Background6,
];

const Hero = () => {
  const [publishedEvent, setPublishedEvent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    // Fetch the single published event from your backend
    const fetchPublishedEvent = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/events/published"
        );

        // If an event is found, set it in state and open the modal
        if (response.data) {
          setPublishedEvent(response.data);
          setModalIsOpen(true);
        }
      } catch (error) {
        console.error("Error fetching published event:", error);
      }
    };

    fetchPublishedEvent();
  }, []); // Empty dependency array ensures this runs only once

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <section className="relative text-white h-[80vh] flex items-center justify-center px-6 md:px-12 ">
      {publishedEvent && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Upcoming Event"
          className="modal-content" 
          overlayClassName="modal-overlay" 
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{publishedEvent.title}</h2>
            <p className="text-gray-700 mb-2">{publishedEvent.description}</p>
            <p className="text-gray-600">
              Date: {new Date(publishedEvent.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-4">
              Location: {publishedEvent.location}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
      <ImageSlider images={images} interval={7000} />

      <div className="absolute w-full h-full text-gray-200 max-h-[500px] bg-black/40 flex flex-col justify-center"></div>

      <div className=" relative z-20 flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl text-center text-white pt-20 mb-4">
          Welcome to KSTVET CU
        </h1>
        <p className="text-lg md:text-xl mb-6">
          A Christ-centered community where students grow in faith, fellowship,
          and purpose.
        </p>
        <p className="italic text-sm md:text-base text-yellow-200 mb-6">
          “Let your light shine before others...” — Matthew 5:16
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/form"
            className="border border-green-200 px-6 py-3 rounded hover:bg-yellow-300 hover:text-primary transition"
          >
            Join Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
