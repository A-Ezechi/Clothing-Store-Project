import {faCartPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Header = () => {
  return (
    <div className="headerContainer">
        <div className="header">
            <h1>A's Wardrobe</h1>
        </div>
        <div className="cart">
            {/* <p>Total Items:</p>
            <p>Total Price:</p> */}
        
        <button className="viewCartbtn"><FontAwesomeIcon icon={faCartPlus} /> :£Total </button>
        </div>
    </div>
  )
}

export default Header