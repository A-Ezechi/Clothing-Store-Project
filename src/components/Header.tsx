

const Header = () => {
  return (
    <div className="headerContainer">
        <div className="header">
            <h1>A's Wardrobe</h1>
        </div>
        <div className="cart">
            <p>Total Items:</p>
            <p>Total Price:</p>
        
        <button className="viewCartbtn">View Cart</button>
        </div>
    </div>
  )
}

export default Header