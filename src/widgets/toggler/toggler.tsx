"use client"
import { motion } from "motion/react"
import React, { useState } from "react"
export const Toggler = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        className={`w-16 h-8 rounded-full cursor-pointer flex items-center px-1 ${
          isToggled ? "bg-green-500" : "bg-gray-400"
        }`}
        onClick={handleToggle}
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          className="w-6 h-6 bg-white rounded-full shadow-md"
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </div>
  );
}

