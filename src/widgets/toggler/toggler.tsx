"use client"
import { motion } from "motion/react"
import React, { useState } from "react"
const Toggler = () => {
  const [isOn, setIsOn] = useState(false)
  const toggleSwitch = () => setIsOn(!isOn)
    
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  }

  return (
    <>
      <div className="switch" data-ison={isOn} onClick={toggleSwitch}>
        <motion.div className={`"h-52 w-52 rounded-full" ${isOn ? "bg-black" : "bg-white"}`} layout transition={spring} />
      </div>
    </>
  )
}

export default Toggler
