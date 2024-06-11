import React, { ReactNode, createContext, useEffect, useState } from 'react'
import axios from 'axios'

interface Product {
    id: number
    title: string
    description?: string
    price: number
    image?: string
    rating?: number
}

interface Cart {
    id: number
    title: string
    price: number
}

interface ContextProps {
    products: Product[];
    trolley: Cart[];
    setTrolley: React.Dispatch<React.SetStateAction<Cart[]>>;
    addToCart: (cart: Cart, event: React.MouseEvent<HTMLButtonElement>) => void
    fetchData: () => void;
    viewProducts: () => JSX.Element[];
}

const Context = createContext<ContextProps | undefined>(undefined)

const Provider: React.FC<{children: ReactNode}> = ({children}) => {
    const [products, setProducts] = useState<Product[]>([])
    const [trolley, setTrolley] = useState<Cart[]>([])

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

    // VIEW PRODUCTS

    const viewProducts = () => {
        return products.map((product) => (
            <div key={product.id} className="productCard">
                <div className="productInfo">
                    <h3 className="productName">{product.title}</h3>
                    <img className="productPicture" src={product.image} alt={product.title} />
                    {/* <p className="productDescription">{product.description}</p> */}
                    <h4 className="price">Price: £{product.price}</h4>
                    <button 
                        className="toCart"
                        onClick={(event) => addToCart(product, event)}
                        >Add to Cart
                    </button>
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
        console.log(trolley)
    }

    return (
        <Context.Provider value={{ products, trolley, setTrolley, fetchData, viewProducts, addToCart }}>
            {children}
        </Context.Provider>
    )
}

export { Context, Provider, type ContextProps }