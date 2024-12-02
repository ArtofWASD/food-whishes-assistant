import React from "react"
import { promises as fs } from "fs"
import FoodItem from "@/src/widgets/food_item/food_item"
import { FoodItemProps } from "@/src/api/types/foods"
// todo реализовать вкладки продуктов, деление по принципу фрукты, овощи, мясо, соусы, прочее
const Fridge = async () => {
  const file = await fs.readFile(
    process.cwd() + "/src/api/fake_foods/fake_food_api.json",
    "utf8",
  )
  const data = JSON.parse(file)

  return (
    <div className="border-gray-600 border-2 border-dashed p-4 rounded-lg bg-slate-300 bg-opacity-35">
      <h1 className="text-center">Fridge</h1>
      <div className="flex gap-2 py-2 flex-wrap">
        {data.foods.map((food: FoodItemProps) => (
          <FoodItem {...food} key={food.id} />
        ))}
      </div>
    </div>
  )
}

export default Fridge
