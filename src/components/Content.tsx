import { useEffect, useState } from "react"
import axios from "axios"

const Content = () => {
  const [products, setProducts] = useState<ProductList[]>([])

  interface ProductList {
    id: number
    name: string
    description: string
    price: number
    image: string
  }

// FETCH DATA
  const fetchData = async () => {
    try {
      const response = await axios.get("https://fake-store-api.mock.beeceptor.com/api/products")
      setProducts(response.data)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  

  const viewProducts = () => {
    return products.map((product) => (
      <div key={product.id} className="productCard">
        <div className="productInfo">
          <h3>{product.name}</h3>
          <img src={product.image} alt={product.name} />
          <p>{product.description}</p>
          <h4>£{product.price}</h4>
          <button>Add to Cart</button>
        </div>
      </div>
    ));
  };


// LOAD DATA ON PAGE LOAD
  useEffect(() => {
    fetchData()
  }, [])



  return (
    <div className="contentContainer">
      {viewProducts()}
    </div>
  )
}

export default Content