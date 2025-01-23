'use client'
import { FoodItemProps } from "@/src/api/types/foods"
import { motion } from "motion/react"
// заменить название БЖУ на иконки, решить проблему с оформлением

// Определяем анимации как константы вне компонента для переиспользования
const ANIMATION_VARIANTS = {
  child: {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
  },
  parent: {
    hidden: { opacity: 0, scale: 0.8, height: 30 },
    show: { opacity: 1, scale: 1, height: 80 },
  },
} as const;

// Выделяем стили в отдельные константы
const CONTAINER_STYLES = "grid grid-cols-auto gap-2 border-gray-600 border-2 px-4 py-2 rounded-lg hover:bg-slate-300 cursor-pointer";
const NUTRITION_INFO_STYLES = "flex gap-2";
const NUTRITION_TEXT_STYLES = "flex gap-1 text-sm";

export const FoodItem = ({ id, name, callory, proteins, fats, carbs }: FoodItemProps) => {
  // Выделяем отображение пищевой ценности в отдельный компонент
  const NutritionInfo = () => (
    <motion.div 
      className={NUTRITION_INFO_STYLES} 
      variants={ANIMATION_VARIANTS.child} 
      initial="hidden" 
      whileHover="show"
    >
      <div className={NUTRITION_TEXT_STYLES}>Б: {proteins} гр.</div>
      <div className={NUTRITION_TEXT_STYLES}>Ж: {fats} гр.</div>
      <div className={NUTRITION_TEXT_STYLES}>У: {carbs} гр.</div>
    </motion.div>
  );

  return (
    <motion.div
      className={CONTAINER_STYLES}
      key={id}
      variants={ANIMATION_VARIANTS.parent}
      initial="show"
      whileHover="show"
    >
      <div className="flex gap-2">
        <h3>{name}</h3>
        <div className={NUTRITION_TEXT_STYLES}>Каллории: {callory} ккал.</div>
      </div>
      <NutritionInfo />
    </motion.div>
  );
}
