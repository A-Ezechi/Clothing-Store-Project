import { useEffect} from "react"
import React from "react"
import { Context, ContextProps } from "./Context"

const Content: React.FC = () => {
  const context = React.useContext(Context)
  const {fetchData, viewProducts, chosenCategory} = context as ContextProps

  if (!context){
    return null
  }

// LOAD DATA ON PAGE LOAD
  useEffect(() => {
    fetchData()
  }, [])

// VIEW PRODUCTS
  return (
    <div className="outsideContentContainer">
      <h3 className="chosenCategoryTitle">{chosenCategory}</h3>
      <div className="contentContainer">
        {viewProducts()}
      </div>
    </div>
  )
}

export default Content