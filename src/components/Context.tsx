import React, { createContext, useState } from 'react'
import Content from './Content'
import axios from 'axios'
import AddToCart from './AddToCart'

interface ProductList {
    id: number
    title: string
    description: string
    price: number
    images: string
    rating: number
}

interface Cart {
    id: number
    title: string
    price: string
}

const Context = createContext({} as any)

const Provider = () => {
    const [products, setProducts] = useState<ProductList[]>([])
    const [cart, setCart] = useState<number | string[]>([])

    // FETCH DATA
    const fetchData = async () => {
        try {
            const response = await axios.get("https://api.escuelajs.co/api/v1/products")
            setProducts(response.data)
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    // VIEW PRODUCTS
    const viewProducts = () => {
        return products.map((product) => (
            <div key={product.id} className="productCard">
                <div className="productInfo">
                    <h3 className="productName">{product.title}</h3>
                    <img className="productPicture" src={product.images} alt={product.title} />
                    <p className="productDescription">{product.description}</p>
                    <h4 className="price">Price: £{product.price}</h4>
                    <button className="toCart">Add to Cart</button>
                </div>
            </div>
        ));
    };

    return (
        <Context.Provider value={{ products, setProducts, cart, setCart, fetchData, viewProducts }}>
            <Content />
            <AddToCart />
        </Context.Provider>
    )
}

export { Context, Provider };