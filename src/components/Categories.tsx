import { useEffect } from "react"
import { Context, ContextProps } from "./Context"
import React from "react"

const Categories: React.FC = () => {

    const context = React.useContext(Context)
    if (!Context) return null
    const { fetchCategories, handleCategoryClick, handleCategoryClickAll, categories} = context as ContextProps

// LOADS FETCH CATEGORIES ON PAGE LOAD
    useEffect(() => {
        fetchCategories()
    }, [])


    return (
        <div className='categoriesOuterContainer'>
            <h1>A's Wardrobe</h1>
            <div className="categoriesContainer">
            <button 
            className="category"
            onClick={handleCategoryClickAll}
            >All</button>
                <div className="categories">
                    {categories.map((category, index) => 
                        <div className="categoryContainer">
                            <div className="id" key={index}></div>
                            <button 
                            className="category"
                            onClick={() => handleCategoryClick(category)}
                            >{category}</button>
                        </div>)}
                </div>
            </div>
        </div>
    )
}

export default Categories