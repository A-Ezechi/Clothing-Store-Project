import {faCartPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Header = () => {
  return (
    <div className="headerContainer">
        <div className="header">
            <h2>A's Wardrobe</h2>
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