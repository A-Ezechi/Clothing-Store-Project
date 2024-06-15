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
    fetchData: () => void;
    viewProducts: () => JSX.Element[];
}

const Context = createContext<ContextProps | undefined>(undefined)

    // STATE MANAGEMENT

const Provider: React.FC<{children: ReactNode}> = ({children}) => {
    const [products, setProducts] = useState<Product[]>([])
    const [trolley, setTrolley] = useState<Cart[]>([])
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [categories, setCategories] = useState<string[]>([])
    const [chosenCategory, setChosenCategory] = useState<string | null>(null)

    // FETCH DATA

    const fetchData = async () => {
        try {
            const response = await axios.get("https://fakestoreapi.com/products")
            setProducts(response.data)
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    // LOAD DATA ON PAGE LOAD

    useEffect(() => {
        fetchData()
    }, [])

    // VIEW PRODUCTS

    const viewProducts = () => {
        return products.map((product) => (
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
        console.log(trolley)
        console.log(totalPrice)
    }

    // FETCHES CATEGORIES

    const fetchCategories = async () => {
        try{
            const response = await axios.get("https://fakestoreapi.com/products/categories")
            setCategories(response.data)
            console.log(response.data)
        } catch (error) {
            console.error(`Unable to fetch categories: ${error}`)}
        }

    // HANDLES CATEGORY CLICK
    const handleCategoryClick = (category: string) => {
        setChosenCategory(category)
    }

    // CHANGES CATEGORY AND DISPLAYS ON UI
    const changeCategory = () => { 
        const filteredProducts = chosenCategory ? products.filter((product: Product) => product.category === chosenCategory) : products

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
        <Context.Provider value={{ products, trolley, setTrolley, fetchData, viewProducts, addToCart, totalPrice }}>
            {children}
        </Context.Provider>
    )
}

export { Context, Provider, type ContextProps }