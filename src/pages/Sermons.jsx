import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}?rel=0`;
    }
    return null;
};

const Sermons = () => {
  const [sermons, setSermons] = useState([]);

  useEffect(() => {
    
    const fetchSermons = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sermons");
        setSermons(response.data);
      } catch (error) {
        console.error("Error fetching sermons:", error);
      }
    };

    fetchSermons();

    const socket = io(`${import.meta.env.VITE_API_URL}`);

    socket.on("sermons_updated", (updatedSermonList) => {

      setSermons(updatedSermonList);
    });

    
    return () => {
      socket.disconnect();
    };
  }, []); 

  return (
    <section className="bg-gray-100 py-16 px-4" id="sermons">

       <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#0A2342] mb-4">
          Sermons
        </h2>
       </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sermons.map((sermon, index) => {
          const videoEmbedUrl = getYouTubeEmbedUrl(sermon.video_url);
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105 ">
              {videoEmbedUrl && (
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    src={videoEmbedUrl}
                    title={sermon.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded"
                  ></iframe>
                </div>
              )}
              {/* ... (Existing text content like title, speaker, date, etc.) ... */}
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{sermon.title}</h3>
              <p className="text-gray-600 mb-1">
                  <strong>Preacher:</strong> {sermon.speaker}
              </p>
              <p className="text-gray-600 mb-4">{sermon.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Sermons;
