import Helmet from 'react-helmet'
import { useGetAllPlantQuery } from '../../rtk query/slice'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router";
import { BsInfoCircleFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { BsBasket2Fill } from "react-icons/bs";
import { useContext } from 'react';
import { favoritesContext } from '../../context/FavoritesContext';
import { basketContext } from '../../context/BasketContext';
import swal from 'sweetalert';

export default function HomePage() {
    let { data, isLoading } = useGetAllPlantQuery()
    let [alldata, setAlldata] = useState([])
    let { favorites, setFavorites } = useContext(favoritesContext)
    let { basket, setBasket } = useContext(basketContext)

    useEffect(() => {
        if (!isLoading && data) {
            setAlldata(data)
        }
    }, [data, isLoading])

    // search
    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase().trim()
        if (searchValue == "") {
            setAlldata(data)
        } else {
            let filtered = alldata.filter((element) => element.name.toLowerCase().startsWith(searchValue))
            setAlldata(filtered)
        }
    }

    // sort
    const handleSort = (e) => {
        switch (e.target.value) {
            case "first-cheap":
                let cheap = alldata.toSorted((a, b) => a.price - b.price)
                setAlldata(cheap)
                break;
            case "first-expensive":
                let expensive = alldata.toSorted((a, b) => b.price - a.price)
                setAlldata(expensive)
                break;
            default:
                setAlldata(data)
                break;
        }
    }

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
                <title>Home Page - Pronia</title>
            </Helmet>
            <>
                {/* hero */}
                <div className="hero">
                    <div className="container">
                        <div className="about">
                            <div>65% OFF</div>
                            <h1>NEW PLANT</h1>
                            <p>Pronia, With 100% Natural, Organic & Plant Shop.</p>
                            <button>DISCOVER NOW</button>
                        </div>
                        <div className="image">
                            <img src="https://htmldemo.net/pronia/pronia/assets/images/slider/inner-img/1-2-524x617.png" alt="" />
                        </div>
                    </div>
                </div>
                {/* cards */}
                <div className="cards">
                    <div className="container">
                        <div className="card">
                            <img src="https://htmldemo.net/pronia/pronia/assets/images/shipping/icon/car.png" alt="." />
                            <div className="about">
                                <h3>Free Shipping</h3>
                                <p>Capped at $319 per order</p>
                            </div>
                        </div>
                        <div className="card">
                            <img src="https://htmldemo.net/pronia/pronia/assets/images/shipping/icon/card.png" alt="." />
                            <div className="about">
                                <h3>Safe Payment</h3>
                                <p>With our payment gateway</p>
                            </div>
                        </div>
                        <div className="card">
                            <img src="https://htmldemo.net/pronia/pronia/assets/images/shipping/icon/service.png" alt="." />
                            <div className="about">
                                <h3>Best Services</h3>
                                <p>Friendly & Supper Services</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* our products */}
                <div>
                    {
                        isLoading ? (
                            <div className="is-loading">
                                <h1>...Loading</h1>
                            </div>
                        ) : (
                            <>
                                <div className="our-products">
                                    <div className="container">
                                        <h1>OUR PRODUCTS</h1>
                                        <div className="buttons">
                                            <div className="featured">Featured</div>
                                            <div className="bestseller">Bestseller</div>
                                            <div className="latest">Latest</div>
                                        </div>
                                        {
                                            data ? (
                                                data.length ? (
                                                    <div className="search-sort">
                                                        <input type="text" placeholder='...search' onChange={(e) => handleSearch(e)} />
                                                        <select onChange={(e) => handleSort(e)}>
                                                            <option>Sorted by price</option>
                                                            <option value="first-cheap">First Cheap</option>
                                                            <option value="first-expensive">First Expensive</option>
                                                        </select>
                                                        <div className="products">
                                                            {
                                                                alldata.map((item) => (
                                                                    <div className="card" key={item._id}>
                                                                        <div style={{ width: '250px' }} className="image">
                                                                            <img style={{ width: '100%', height: '100%' }} src={item.image} alt="." />
                                                                        </div>
                                                                        <div className="name">{item.name}</div>
                                                                        <div className="price">${item.price.toFixed(2)}</div>
                                                                        <div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                                                                        <div className="icons">
                                                                            <span className='fav' onClick={() => handleFavorites(item)}><FaHeart /></span>
                                                                            <span className='basket' onClick={() => handleBasket(item)}><BsBasket2Fill /></span>
                                                                            <NavLink to={`detail/${item._id}`} style={{ color: "lightskyblue" }}><span className='info' ><BsInfoCircleFill /></span></NavLink>
                                                                        </div>
                                                                    </div>
                                                                    // </div>
                                                                ))
                                                            }
                                                        </div>

                                                    </div>
                                                ) : (
                                                    <h1>No data!</h1>
                                                )

                                            ) : (
                                                <h1>Data not found!</h1>
                                            )
                                        }

                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>

                {/* logos */}
                <div className="logos-wrapper">
                    <div className="container">
                        <div className="logos">
                            <img src="https://htmldemo.net/pronia/pronia/assets/images/brand/1-4.png" alt="." />
                            <img src="https://htmldemo.net/pronia/pronia/assets/images/brand/1-5.png" alt="." />
                            <img src="https://htmldemo.net/pronia/pronia/assets/images/brand/1-2.png" alt="." />
                            <img src="https://htmldemo.net/pronia/pronia/assets/images/brand/1-3.png" alt="." />
                            <img src="https://htmldemo.net/pronia/pronia/assets/images/brand/1-4.png" alt="." />
                        </div>
                    </div>
                </div>

                {/* latest blog */}
                <div className="latest-blog">
                    <div className="container">
                        <h1>LATEST BLOG</h1>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature</p>
                        <div className="latest-blog-grid">
                            <div className="latest-card">
                                <div>BY: ADMIN 24 APRIL 2021</div>
                                <h2>Aenean Vulputate Lorem</h2>
                                <p>Lorem ipsum dolor sit amet, consecteturl adipisl elit, sed do eiusmod tempor incidio ut labore et dolore magna aliqua.</p>
                                <div className="image">
                                    <img src="https://htmldemo.net/pronia/pronia/assets/images/blog/medium-size/1-2-310x220.jpg" alt="." />
                                </div>
                            </div>
                            <div className="latest-card">
                                <div>BY: ADMIN 24 APRIL 2021</div>
                                <h2>There Many Variations</h2>
                                <p>Lorem ipsum dolor sit amet, consecteturl adipisl elit, sed do eiusmod tempor incidio ut labore et dolore magna aliqua.</p>
                                <div className="image">
                                    <img src="https://htmldemo.net/pronia/pronia/assets/images/blog/medium-size/1-3-310x220.jpg" alt="." />
                                </div>
                            </div>
                            <div className="latest-card">
                                <div>BY: ADMIN 24 APRIL 2021</div>
                                <h2>Maecenas Laoreet Massa</h2>
                                <p>Lorem ipsum dolor sit amet, consecteturl adipisl elit, sed do eiusmod tempor incidio ut labore et dolore magna aliqua.</p>
                                <div className="image">
                                    <img src="https://htmldemo.net/pronia/pronia/assets/images/blog/medium-size/1-1-310x220.jpg" alt="." />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        </>
    )
}
