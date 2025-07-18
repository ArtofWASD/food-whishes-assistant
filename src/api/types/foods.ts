export interface FoodItemProps {
    id: number
    name: string
    imgUrl: string
    callory: number
    fats: number
    carbs: number
    proteins: number
    type: 'meat' | 'milk' | 'vegetable' | 'grain' | 'fruit'
}