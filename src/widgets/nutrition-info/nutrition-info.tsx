"use client"
import { motion } from "framer-motion"
import { NutritionInfoProps } from "@/src/types"

const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, height: 0 },
  show: { opacity: 1, height: "auto", zIndex: 1000 },
  exit: { opacity: 0, height: 0 },
} as const

const NUTRITION_INFO_STYLES = "flex flex-col gap-1 overflow-hidden rounded-full"
const NUTRITION_TEXT_STYLES = "flex gap-1 text-sm"

const NutritionInfo = ({ proteins, fats, carbs, callory }: NutritionInfoProps) => (
  <motion.div
    className={NUTRITION_INFO_STYLES}
    variants={ANIMATION_VARIANTS}
    initial="hidden"
    animate="show"
    exit="exit"
    transition={{ duration: 0.2 }}
  >
    <div className={NUTRITION_TEXT_STYLES}>Каллории: {callory} ккал.</div>
    <div className={NUTRITION_TEXT_STYLES}>Б: {proteins} гр.</div>
    <div className={NUTRITION_TEXT_STYLES}>Ж: {fats} гр.</div>
    <div className={NUTRITION_TEXT_STYLES}>У: {carbs} гр.</div>
  </motion.div>
)

export default NutritionInfo 