import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 },
};

export default function ScrollSections() {
  return (
    <div>

      <BigSection
        image="/src/assets/images/img1.jpg"
        title="Safe Crop Storage"
        text="Farmers can safely store their crops in our modern cold storage facilities and sell when market prices are favorable."
        bg="bg-white"
      />

      <BigSection
        image="/src/assets/images/img2.jpg"
        title="Better Market Value"
        text="We give farmers the power to wait, decide, and earn more instead of selling under pressure."
        reverse
        bg="bg-[#f4fbf6]"
      />

      <BigSection
        image="/src/assets/images/img3.jpg"
       
        title="Temperature Controlled Environment"
        text="Advanced cooling systems maintain ideal temperature and humidity for long-term freshness."
        bg="bg-white"
      />

      <BigSection
        image="/src/assets/images/img4.jpg"

        title="Trusted by Farmers"
        text="Our services are trusted by hundreds of farmers across regions for reliability and safety."
        reverse
        bg="bg-[#f4fbf6]"
      />

      <BigSection
        image="/images/img5.jpg"
        title="Grow Without Worry"
        text="Focus on farming and growth — we handle storage, safety, and preservation."
        bg="bg-white"
      />

    </div>
  );
}

function BigSection({ image, title, text, reverse, bg }) {
  return (
    <section className={`${bg} min-h-screen flex items-center`}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* IMAGE */}
        <div className="md:w-1/2 overflow-hidden rounded-3xl">
          <img
            src={image}
            alt=""
            className="
              w-full 
              rounded-3xl
              transition-transform 
              duration-500
              ease-out
              hover:scale-105
              hover:shadow-xl
            "
          />
        </div>

        {/* TEXT */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-green-700 mb-6">
            {title}
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            {text}
          </p>

          {/* BUTTON */}
          <button className="
            px-8 py-3 
            bg-green-600 
            text-white 
            font-semibold 
            rounded-full
            hover:bg-green-700
            transition
          ">
            Learn More
          </button>
        </div>
      </motion.div>
    </section>
  );
}