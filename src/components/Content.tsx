import { useEffect, useState } from "react"
import axios from "axios"

const Content = () => {
  const [products, setProducts] = useState<ProductList[]>([])
  const [cart, setCart] = useState<number | string[]>([])

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


// LOAD DATA ON PAGE LOAD
  useEffect(() => {
    fetchData()
  }, [])

  //SEND TO CART

  const sendToCart = (id: number): Cart => {
    setCart([...cart, id])
  }


  return (
    <div className="contentContainer">
      {viewProducts()}
    </div>
  )
}

export default Content