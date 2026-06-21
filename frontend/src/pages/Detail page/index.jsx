import Helmet from 'react-helmet'
import { useGetPlantByIdQuery } from '../../rtk query/slice'
import { useParams } from 'react-router'
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { BsBasket2Fill } from "react-icons/bs";
import { useContext } from 'react';
import { favoritesContext } from '../../context/FavoritesContext';
import { basketContext } from '../../context/BasketContext';
import swal from 'sweetalert';

export default function DetailPage() {
    let { id } = useParams()
    let { data, isLoading } = useGetPlantByIdQuery(id)
    let { favorites, setFavorites } = useContext(favoritesContext)
    let { basket, setBasket } = useContext(basketContext)


    // add favs
    const handleFavorites = (item) => {
        let finded = favorites.find((element) => element._id == item._id)
        if (finded) {
            swal("Oops!", "This product is in your wishlist!", "error");
        } else {
            swal("Success!", "Success add to your wishlist!", "success");
            setFavorites([...favorites, item])
        }
    }

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

    return (
        <>
            <Helmet>
                <title>Detail Page - Pronia</title>
            </Helmet>
            <div>
                {
                    isLoading ? (
                        <div className="is-loading">
                            <h1>...Loading</h1>
                        </div>
                    ) : (
                        <div className="container detail-page">
                            <div className="card" key={data._id}>
                                <div style={{ width: '250px', marginRight: '20px' }} className="image">
                                    <img style={{ width: '100%', height: '100%' }} src={data.image} alt="." />
                                </div>
                                <div className="about">
                                    <div className="name">{data.name}</div>
                                    <div className="price">${data.price.toFixed(2)}</div>
                                    <div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                                    <div className="icons">
                                        <span className='fav' onClick={() => handleFavorites(data)}><FaHeart /></span>
                                        <span className='basket' onClick={() => handleBasket(data)}><BsBasket2Fill /></span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}
