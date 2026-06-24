import { FaSquarePhone } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaStoreAlt } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { NavLink } from "react-router";
import { FaBars } from "react-icons/fa6";
import { useContext } from "react";
import { favoritesContext } from "../../context/FavoritesContext";
import { basketContext } from "../../context/BasketContext";

export default function Navbar() {
  let { favorites } = useContext(favoritesContext)
  let { basket } = useContext(basketContext)
  return (
    <div className="navbar">
      <div className="first-navbar">
        <div className="container">
          <div className="phone"> <FaSquarePhone /> <span>+00 123 456 789</span></div>
          <NavLink to={"/"} >
            <div className="image"><img src="https://htmldemo.net/pronia/pronia/assets/images/logo/dark.png" alt="." /></div>
          </NavLink>
          <div className="icons">
            <NavLink to={"/add"} style={{ color: "#000" }}>
              <FaPlus />
            </NavLink>
            <NavLink to={"/basket"} style={{ color: "#000" }}>
              <FaStoreAlt />
            </NavLink>
            <NavLink to={"/favorites"} style={{ color: "#000" }}>
               <CiHeart />
            </NavLink>
            <FaRegUser />
          </div>
        </div>
      </div>
      <div className="line"></div>
      <div className="second-navbar">
        <div className="container">
          <div className="links">
            <NavLink to={"/"} style={{ color: "#000" }}>
              <span>Home</span>
            </NavLink>
            <NavLink to={"/add"} style={{ color: "#000" }}>
              <span>Add</span>
            </NavLink>
            <NavLink to={"/favorites"} style={{ color: "#000" }}>
              <span>Wishlist ({favorites.length})</span>
            </NavLink>
            <NavLink to={"/basket"} style={{ color: "#000" }}>
              <span>Basket ({basket.length})</span>
            </NavLink>
          </div>
          <div className="bars"><FaBars /></div>
        </div>
      </div>
    </div>
  )
}

