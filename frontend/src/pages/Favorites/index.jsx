import { useContext } from 'react'
import Helmet from 'react-helmet'
import { favoritesContext } from '../../context/FavoritesContext'
import { basketContext } from '../../context/BasketContext'
import { FaHeartBroken, FaStar } from "react-icons/fa";
import { NavLink } from "react-router";
import { BsInfoCircleFill } from "react-icons/bs";
import { BsBasket2Fill } from "react-icons/bs";
import swal from 'sweetalert';

export default function Favorites() {
    let { favorites, setFavorites } = useContext(favoritesContext)
    let { basket, setBasket } = useContext(basketContext)

    // add basket
    const handleBasket = (item) => {
        let finded = basket.find((element) => element._id == item._id)
        if (finded) {
            finded.count++
            setBasket([...basket])
        } else {
            swal("Success!", "Success add to your basket!", "success");
            setBasket([...basket, { ...item, count: 1 }])
        }
    }

    // delete fav
    const deleteFavorites = (item) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this plant?",
            icon: "warning",
            dangerMode: true,
        })
            .then(async willDelete => {
                if (willDelete) {
                    let filtered = favorites.filter((element) => element._id != item._id)
                    setFavorites(filtered)
                    swal("Deleted!", `Deleted ${item.name}`, "success");
                }
            });
    }

    return (
        <>
            <Helmet>
                <title>Favorites - Pronia</title>
            </Helmet>
            <div className='favorites-page'>
                {
                    favorites.length ? (
                        <div className="fav-grid container">
                            {
                                favorites.map((item) => (
                                    <div className="card" key={item._id}>
                                        <div className="image">
                                            <img src={item.image} alt="." />
                                            <div className="name">{item.name}</div>
                                            <div className="price">${item.price.toFixed(2)}</div>
                                            <div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                                            <div className="icons">
                                                <span className='fav' onClick={() => deleteFavorites(item)}><FaHeartBroken /></span>
                                                <span className='basket' onClick={() => handleBasket(item)}><BsBasket2Fill /></span>
                                                <NavLink to={`/detail/${item._id}`} style={{ color: "lightskyblue" }}><span className='info' ><BsInfoCircleFill /></span></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <div className="fav-page">
                            <h1>
                                No product😞
                            </h1>
                        </div>
                    )
                }
            </div>
        </>
    )
}
