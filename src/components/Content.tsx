import { useEffect} from "react"
import React from "react"
import { Context, ContextProps } from "./Context"

const Content: React.FC = () => {
  const context = React.useContext(Context)
  const {fetchData, viewProducts} = context as ContextProps

  if (!context){
    return null
  }

// LOAD DATA ON PAGE LOAD
  useEffect(() => {
    fetchData()
  }, [])

// VIEW PRODUCTS
  return (
    <div className="contentContainer">
      {viewProducts()}
    </div>
  )
}

export default Content