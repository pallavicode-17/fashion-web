import { Link } from 'react-router-dom'; 
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const categories = [
     { name: "All categories", path: "/" },
  { name: "Women", path: "/clothes" },
  { name: "Clothing", path: "/clothes" },
  { name: "Footwear", path: "/footwear" },
  { name: "Bags and Wallets", path: "/handbags" },
  { name: "Accessories", path: "/accessories" },
  { name: "Fashion", path: "/fashion" },
  { name: "Fragrances", path: "/fragence" },
  { name: "Caps & Hats", path: "/cap" },
];


// Inside the Navbar component


export default function Navbar() {
    
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = React.useState(categories[0].path);

  const handleCategoryChange = (e) => {
    const selectedPath = e.target.value;
    setSelectedCategory(selectedPath);
    navigate(selectedPath);
  };
const {getTotalCartItems} = useContext(ShopContext)
    return (
        <div className="container">
            <div className="nav-1">
                <span className="header-item">
                    <i className="fa-solid fa-cart-shopping"></i> FREE SHIPPING ON ALL ORDER
                </span>
                <span className="header-item">
                    <i className="fa-solid fa-money-bill-1-wave"></i> 100% MONEY BACK GUARANTEE
                </span>
                <span className="header-item">
                    <i className="fa-regular fa-clock"></i> ONLINE SUPPORT 24/7
                </span>
            </div>
            <div className="nav-2">
                <div className="logo">
                    <img src="/img/Store.png" />
                </div>
               <div className="search-bar">
      <input type="text" placeholder="Search" />
      <span className="divider"></span>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="category-select"
        style={{ minWidth: "130px", height: "40px" }}
      >
        {categories.map((cat) => (
          <option value={cat.path} key={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <button className="search-btn"placeholder="all categories">
        <i className="fa fa-search"></i>
      </button>
    </div>

                <div className="social-circles">
                    <a href="#" className="circle">
                        <i className="fa-brands fa-facebook"></i>
                    </a>
                    <a href="#" className="circle">
                        <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a href="#" className="circle">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="#" className="circle">
                        <i className="fa-brands fa-youtube"></i>
                    </a>
                </div>
            </div>
            <div className="main-nav">
                <ul>
                   <li><Link to="/" className="active">HOME</Link></li>
				  <li><Link to="/shop">SHOP</Link></li>
				  <li><Link to="/features">FEATURES</Link></li>
				  <li><Link to="/mega-group">MEGA GROUP</Link></li>
				  <li><Link to="/aboutus">ABOUT</Link></li>
				  <li><Link to="/blog">BLOG</Link></li>
				  <li><Link to="/Contact">CONTACT</Link></li>
                </ul>
                <div className="shopping-cart">
                    <i className="fa-solid fa-cart-shopping"></i><Link to="/cart">Shopping cart ({getTotalCartItems()})</Link> 
                </div>
                  {localStorage.getItem('auth-token')
          ?<button className="login-btn" onClick={() => {localStorage.removeItem('auth-token');window.location.replace('/')}}>Log Out</button>
          :  <Link to="/login" className="login-btn">Login</Link>
        }
            </div>
        </div>
    );
}
