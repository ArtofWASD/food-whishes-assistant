import { FoodItemProps } from "@/src/api/types/foods"
// заменить название БЖУ на иконки, решить проблему с оформлением
const FoodItem = (item: FoodItemProps) => {
  return (
    <div
      className="grid grid-cols-auto gap-2 border-gray-600 border-2 px-4 py-2 rounded-lg hover:bg-slate-300 cursor-pointer"
      key={item.id}>
      <div className="flex gap-2">
        <h3>{item.name}</h3>
        <div className="flex gap-1 text-sm">Каллории: {item.callory} ккал.</div>
      </div>
      <div className="flex gap-2">
        <div className="flex gap-1 text-sm">Б: {item.proteins}</div>
        <div className="flex gap-1 text-sm">Ж: {item.fats}</div>
        <div className="flex gap-1 text-sm">У: {item.carbs}</div>
      </div>
    </div>
  )
}

export default FoodItem
