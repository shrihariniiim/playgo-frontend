// src/components/HomeImages.jsx
import React from 'react';
import { motion } from 'framer-motion';

const HomeImages = () => {
  return (
    <div className="flex flex-wrap items-center justify-center md:h-[600px] mt-6">
      <div className="flex w-full md:w-1/2 justify-center items-center p-2">
        <motion.img
          src="https://playo-website.gumlet.io/playo-website-v3/hero/hero_left.png"
          alt="Playo Basketball"
          className="rounded-lg object-cover w-full h-[600px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      <div className="flex flex-col w-full md:w-1/2 p-2 gap-4">
        <motion.img
          src="https://playo-website.gumlet.io/playo-website-v3/hero/hero_right_top.png"
          alt="Playo Badminton"
          className="rounded-lg object-cover w-full h-[390px]"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.img
          src="https://playo-website.gumlet.io/playo-website-v3/hero/hero_right_bottom.png"
          alt="Playo Football"
          className="rounded-lg object-cover w-full h-[190px]"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </div>
    </div>
  );
};

export default HomeImages;
