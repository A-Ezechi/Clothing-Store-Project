import { useState, useEffect } from "react"
import axios from "axios"

interface Category {
    id: number
    name: string
}

const Categories = () => {
    const [categories, setCategories] = useState<string[]>([])
    const [chosenCategory, setChosenCategory] = useState<string[]>([])

    const fetchCategories = async () => {
        try{
            const response = await axios.get("https://fakestoreapi.com/products/categories")
            setCategories(response.data)
            console.log(response.data)
        } catch (error) {
            console.error(`Unable to fetch categories: ${error}`)}
        }

    const setCategory = (id: Category, name: Category) => {
        
    }

    useEffect(() => {
        fetchCategories()
    }, [])

  return (
    <div className='categoriesContainer'>
        <h1>A's Wardrobe</h1>
        <div className="categories">
            {categories.map((category, index) => 
                <div className="categoryContainer">
                    <div className="id" key={index}></div>
                    <button className="category">{category}</button>
                </div>)}
        </div>
    </div>
  )
}

export default Categories