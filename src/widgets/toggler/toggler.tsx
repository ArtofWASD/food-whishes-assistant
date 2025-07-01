"use client"
import { motion } from "motion/react"
import React from "react"

interface TogglerProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const Toggler: React.FC<TogglerProps> = ({ label, value, onChange }) => {
  const handleToggle = () => {
    onChange(!value);
  };

  return (
    <div className="flex items-center gap-2 m-2">
      <motion.div
        className={`w-13 h-8 rounded-full cursor-pointer flex items-center px-1 ${
          value ? "bg-green-500" : "bg-gray-400"
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
          animate={{ x: value ? 20 : 0 }}
        />
      </motion.div>
      <span className="text-sm select-none">{label}</span>
    </div>
  );
}

export default Toggler

