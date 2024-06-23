import React from 'react'
import { Context, ContextProps } from './Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

interface Cart {
    id: number
    title: string
    price: number
    image?: string
    description?: string
}

const Cart: React.FC = () => {
    const context = React.useContext(Context)
    if (!context) return null
    const { trolley, totalPrice, displayCart, removeItem} = context as ContextProps

    return (
        <div className='outsideCartContainer'>
                {displayCart && (
                    <>
                    <div className="innerCartContainer">
                        <h3 className='cartHeader'>Cart</h3>
                        {trolley.map((cartItem, index) => (
                            <div className='cartContainer' key={index}>
                                <div className='cart'>
                                    <img src={cartItem.image} alt={cartItem.title} className='cartImage'/>
                                    <div className='cartTitle'>{cartItem.title}</div>
                                    <div className="itemDetails">
                                        <div className="cartDescription">{cartItem.description}</div>
                                        <div className='cartPrice'>£{cartItem.price.toFixed(2)}</div>
                                        <button 
                                        className="removeFromCart"
                                        onClick={() => removeItem(index)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} style={{color: "#d42b2b"}} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button className='checkout'>Checkout: £{totalPrice.toFixed(2)}</button>
                        </div>
                    </>
                )}
        </div>
    )
}

export default Cart
