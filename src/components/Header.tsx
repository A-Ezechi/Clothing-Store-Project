import {faCartPlus} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { Context, ContextProps } from './Context'

const Header: React.FC = () => {

  const context = React.useContext(Context)
  const {totalPrice} = context as ContextProps

  return (
    <div className="headerContainer">
        <div className="header">
            <h2>A's Wardrobe</h2>
        </div>
        <div className="cart">
            {/* <p>Total Items:</p>
            <p>Total Price:</p> */}
        
        <button className="viewCartbtn"><FontAwesomeIcon icon={faCartPlus} /> : £ {totalPrice} </button>
        </div>
    </div>
  )
}

export default Header