'use client'
import { FoodItemProps } from "@/src/api/types/foods"
import { motion } from "motion/react"
// заменить название БЖУ на иконки, решить проблему с оформлением
export const FoodItem = (item: FoodItemProps) => {
  const childVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
  };
  const parentVariants = {
    hidden: { opacity: 0, scale: 0.8, height:30 },
    show: { opacity: 1, scale: 1, height: 80 },
  };

  return (
    <motion.div
      className="grid grid-cols-auto gap-2 border-gray-600 border-2 px-4 py-2 rounded-lg hover:bg-slate-300 cursor-pointer"
      key={item.id}
    variant={parentVariants} initial="show" whileHover="show">
      <div className="flex gap-2">
        <h3>{item.name}</h3>
        <div className="flex gap-1 text-sm">Каллории: {item.callory} ккал.</div>
      </div>
      <motion.div className="flex gap-2" variants={childVariants} initial="hidden" whileHover="show">
        <div className="flex gap-1 text-sm">Б: {item.proteins} гр.</div>
        <div className="flex gap-1 text-sm">Ж: {item.fats} гр.</div>
        <div className="flex gap-1 text-sm">У: {item.carbs} гр.</div>
      </motion.div>
    </motion.div>
  )
}
