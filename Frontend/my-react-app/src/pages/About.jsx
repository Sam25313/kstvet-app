import React from 'react'
import Praying from '../assets/Praying.jpg'

const About = () => {
  return (
     <section className="bg-white py-16 px-4" id="about">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Image */}
        <div>
          <img
            src={Praying} 
            alt="Students worshipping together"
            className="rounded-lg shadow-md w-full object-cover"
          />
        </div>

        {/* Right: Text Content */}
        <div>
          <h2 className="text-3xl font-bold text-[#0A2342] mb-4">About Us</h2>
          <p className="text-gray-700 mb-6">
            KSTVET CU is a vibrant community of believers committed to growing in faith,
            serving Christ, and transforming lives through fellowship, worship, and outreach.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-[#FFD166]">Our Mission</h3>
              <p className="text-gray-600">
                To build a Christ-centered fellowship that nurtures spiritual growth and
                empowers students to live out their faith boldly.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#FFD166]">Core Values</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Faith & Prayer</li>
                <li>Love & Service</li>
                <li>Unity & Fellowship</li>
                <li>Integrity & Leadership</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#FFD166]">Our Story</h3>
              <p className="text-gray-600">
                Founded by passionate students, KSTVET CU has grown into a spiritual home
                for many — a place where lives are changed, friendships are formed, and
                Christ is glorified.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About;
