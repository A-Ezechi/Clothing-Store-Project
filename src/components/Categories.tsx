import { useState, useEffect } from "react"
import { Context, ContextProps } from "./Context"
import React from "react"
import axios from "axios"

interface Category {
    category: string
    id: number
    title: string
    description?: string
    price: number
    image?: string
    rating?: number
}

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<string[]>([])
    const [chosenCategory, setChosenCategory] = useState<string | null>(null)

    const context = React.useContext(Context)
    if (!Context) return null
    const {products, addToCart} = context as ContextProps

// FETCHES CATEGORIES

    const fetchCategories = async () => {
        try{
            const response = await axios.get("https://fakestoreapi.com/products/categories")
            setCategories(response.data)
            console.log(response.data)
        } catch (error) {
            console.error(`Unable to fetch categories: ${error}`)}
        }

// LOADS FETCH CATEGORIES ON PAGE LOAD
    useEffect(() => {
        fetchCategories()
    }, [])

// HANDLES CATEGORY CLICK
        const handleCategoryClick = (category: Category) => {
            setChosenCategory(category.category)
        }

    // CHANGES CATEGORY AND DISPLAYS ON UI
        const changeCategory = () => { 
            
            const filteredProducts = chosenCategory ? products.filter((product: Category) => product.category === chosenCategory) : products

            return (
                <div className="products">
                    {filteredProducts.map((product: Product) => (
                        <div className="productCard" key={product.id}>
                        <div className="productInfo">
                        <img className="productPicture" src={product.image} alt={product.title} />
                        <h3 className="productName">{product.title}</h3>
                        <div className="price">
                        <div className="priceAddToCart">
                            <h4 className="price">Price: £{product.price}</h4>
                            <button 
                                className="toCart"
                                onClick={(event) => addToCart(product, event)}
                                >Add to Cart
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                    ))}
            </div>
            )
        }


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