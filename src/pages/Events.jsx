import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const Events = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    // Fetch all events from your backend API
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
    const socket = io(`${import.meta.env.VITE_API_URL}`);
    socket.on("events_updated", (updatedEventList) => {
      // When an update is received, update the state
      setEvents(updatedEventList);
    });
    return () => {
      socket.disconnect();
    };
  }, []); // The empty dependency array ensures this runs only once

  return (
    <section className="bg-[#F5F5F5] py-16 px-4" id="events">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#0A2342] mb-4">
          Upcoming Events
        </h2>
        <p className="text-gray-700 mb-10">
          Stay connected and be part of what God is doing through our CU
          activities.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-[#0A2342] mb-2">
                {event.title}
              </h3>
              <p className="text-gray-600 mb-1">
                <strong>Date:</strong> {event.date}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Time:</strong> {event.time}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Location:</strong> {event.location}
              </p>
              <a
                href={event.registerLink}
                className="text-[#FFD166] font-medium hover:underline"
              >
                Register / Add to Calendar →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
