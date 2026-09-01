import React from "react";
import "./About.css";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="about-container">
      {/* HEADER SECTION */}
      <section className="about-hero">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Us
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Empowering Farmers With Secure, Modern Crop Storage Solutions.
        </motion.p>
      </section>

      {/* WHO WE ARE */}
      <section className="about-section">
        <motion.div 
          className="about-card"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2>Who We Are</h2>
          <p>
            We provide a modern cold storage facility where farmers can safely 
            store their crops and choose the best time to sell. Our mission is 
            to bring transparency, security, and growth into the agricultural 
            supply chain.
          </p>
        </motion.div>

        <motion.img 
          src="/about1.jpg"
          alt="Cold Storage"
          className="about-img"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        />
      </section>

      {/* OUR MISSION */}
      <section className="about-section reverse">
        <motion.img 
          src="/about2.jpg"
          alt="Mission"
          className="about-img"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        />

        <motion.div 
          className="about-card"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2>Our Mission</h2>
          <p>
            To reduce crop wastage, support farmers financially, and create a 
            seamless platform where storage, tracking, and selling become easy 
            and profitable.
          </p>
        </motion.div>
      </section>

      {/* STATS */}
      <motion.section 
        className="stats-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="stat-box">
          <h3>5000+</h3>
          <p>Farmers Supported</p>
        </div>

        <div className="stat-box">
          <h3>30,000 MT</h3>
          <p>Storage Capacity</p>
        </div>

        <div className="stat-box">
          <h3>12+ Years</h3>
          <p>Industry Experience</p>
        </div>
      </motion.section>
    </div>
  );
};

export default About;