import React from 'react'
import { Context, ContextProps } from './Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Cart = () => {

    const context = React.useContext(Context)
    if (!context) return null
    const { trolley, totalPrice, displayCart } = context as ContextProps

    //CART DISPLAY STATE MANAGEMENT
        
    return (
        <div className='outsideCartContainer'>
            <div className="innerCartContainer">
                <h3 className='cartHeader'>Cart</h3>
            { 
               displayCart ? trolley.map((cart, index) => (
                    <div className='cartContainer'>
                        <div className='cart' key={index}>
                            <img src={cart.image} alt={cart.title} className='cartImage'/>
                            <div className='cartTitle'>{cart.title}</div>
                            <div className="itemDetails">
                                    <div className="cartDescription">{cart.description}</div>
                                    <div className='cartPrice'>£{cart.price}</div>
                                <button className="removeFromCart"><FontAwesomeIcon icon={faTrash} style={{color: "#d42b2b",}} /></button>
                            </div>
                        </div>
                    </div>
                )) : null
            }

            <button className='checkout'>Checkout: £{totalPrice}</button>
            </div>
        </div>
    )
}

export default Cart