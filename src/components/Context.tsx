import React, { ReactNode, createContext, useEffect, useState } from 'react'
import axios from 'axios'

// INTERFACES

interface Product {
    id: number
    title: string
    description?: string
    price: number
    image?: string
    rating?: number
    category?: string
}

interface Cart {
    id: number
    title: string
    price: number
}

interface ContextProps {
    products: Product[];
    trolley: Cart[];
    totalPrice: number;
    setTrolley: React.Dispatch<React.SetStateAction<Cart[]>>;
    addToCart: (cart: Cart, event: React.MouseEvent<HTMLButtonElement>) => void
    handleCategoryClick: (category: string) => void
    handleCategoryClickAll: () => void
    fetchCategories: () => void
    fetchData: () => void;
    viewProducts: () => JSX.Element[];
    categories: string[];
}

const Context = createContext<ContextProps | undefined>(undefined)

const Provider: React.FC<{children: ReactNode}> = ({children}) => {

    // STATE MANAGEMENT

    const [products, setProducts] = useState<Product[]>([]) // DISPLAYS THE PRODUCTS ONTO THE UI
    const [trolley, setTrolley] = useState<Cart[]>([]) // HOLDS THE PRODUCTS IN THE CART
    const [totalPrice, setTotalPrice] = useState<number>(0) // DISPLAYS THE TOTAL PRICE OF THE PRODUCTS IN THE CART ONTO THE UI
    const [categories, setCategories] = useState<string[]>([]) // DISPLAYS THE CATEGORIES ONTO THE UI
    const [chosenCategory, setChosenCategory] = useState<string | null>(null) // DISPLAYS THE CHOSEN CATEGORY ONTO THE UI

    // FETCH DATA

    const fetchData = async () => {
        try {
            const response = await axios.get("https://fakestoreapi.com/products")
            setProducts(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    // LOAD DATA ON PAGE LOAD

    useEffect(() => {
        fetchData()
    }, [])

    // VIEW PRODUCTS ON THE UI BY MAPPING THROUGH THE PRODUCTS STATE

    const viewProducts = () => {
        const filteredProducts = chosenCategory ? products.filter((product: Product) => product.category === chosenCategory) : products

        console.log('Chosen category: ', chosenCategory)

        return filteredProducts.map((product) => (
            <div key={product.id} className="productCard">
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
        ));
    };

    // ADD TO CART

    const addToCart = (product: Product, event?: React.MouseEvent<HTMLButtonElement>) => {
        event?.preventDefault()

        const cartItem: Product = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image
        }

        setTrolley((trolley) => [...trolley, cartItem])
        setTotalPrice((totalPrice) => Number((totalPrice + product.price).toFixed(2)))
    }

    // FETCHES CATEGORIES

    const fetchCategories = async () => {
        try{
            const response = await axios.get("https://fakestoreapi.com/products/categories")
            setCategories(response.data)
        } catch (error) {
            console.error(`Unable to fetch categories: ${error}`)}
        }

    // HANDLES CATEGORY CLICK
    const handleCategoryClick = (category: string) => {
        setChosenCategory(category)
        console.log('Chosen category: ', chosenCategory)
    }

    // HANDLE CATEGORY CLICK(ALL)

     const handleCategoryClickAll = () => {
        setChosenCategory(null)
     }

    return (
        <Context.Provider value={{ products, trolley, setTrolley, fetchData, viewProducts, addToCart, totalPrice, handleCategoryClick, handleCategoryClickAll, fetchCategories, categories }}>
            {children}
        </Context.Provider>
    )
}

export { Context, Provider, type ContextProps }