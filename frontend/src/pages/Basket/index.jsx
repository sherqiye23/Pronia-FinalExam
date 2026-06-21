import Helmet from 'react-helmet'
import { useContext, useEffect, useState } from "react"
import { basketContext } from '../../context/BasketContext'
import swal from 'sweetalert';

export default function Basket() {
    let { basket, setBasket } = useContext(basketContext)
    let [total, setTotal] = useState("")

    function handleDecrease(item) {
        if (item.count > 1) {
            item.count--
            setBasket([...basket])
        } else {
            swal({
                title: "Are you sure?",
                text: "Are you sure that you want to delete this plant?",
                icon: "warning",
                dangerMode: true,
            })
                .then(willDelete => {
                    if (willDelete) {
                        let filtered = basket.filter(basketDel => basketDel._id != item._id)
                        setBasket(filtered)
                        swal("Deleted!", `Deleted ${item.name}`, "success");
                    }
                });
        }
    }

    function handleIncrease(item) {
        item.count++
        setBasket([...basket])
    }

    function handleDelete(item) {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this plant?",
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    let filtered = basket.filter(basketDel => basketDel._id != item._id)
                    setBasket(filtered)
                    swal("Deleted!", `Deleted ${item.name}`, "success");
                }
            });
    }

    useEffect(() => {
        let total = basket.reduce((sum, total) => sum + (total.price * total.count), 0)
        setTotal(total.toFixed(2))
    })

    return (
        <>
            <Helmet>
                <title>Basket - Pronia</title>
            </Helmet>
            <div className='basket-wrapper'>
                {
                    basket.length ? (
                        <div className='container'>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Image</td>
                                        <td>Name</td>
                                        <td>Price</td>
                                        <td>Total Price</td>
                                        <td>Decrease</td>
                                        <td>Count</td>
                                        <td>Increase</td>
                                        <td>Delete</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        basket.map((item) => (
                                            <tr key={item._id}>
                                                <td><img src={item.image} alt="bookImg" width={"100px"} /></td>
                                                <td>{item.name}</td>
                                                <td>{item.price}$</td>
                                                <td>{(item.price * item.count).toFixed(2)}$</td>
                                                <td>
                                                    <span onClick={() => handleDecrease(item)}>
                                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
                                                    </span>
                                                </td>
                                                <td>{item.count}</td>
                                                <td>
                                                    <span onClick={() => handleIncrease(item)}>
                                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"></path></svg>
                                                    </span>
                                                </td>
                                                <td>
                                                    <span style={{ color: "darkred" }} onClick={() => handleDelete(item)}>
                                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                            <h1 style={{ margin: "20px 0" }}>Total Price: {total}$ </h1>
                        </div>
                    ) : (
                        <div className="basket-page">
                            <h1>
                                Sizin basket səhifəniz boşdur😞
                            </h1>
                        </div>
                    )
                }

            </div>
        </>
    )
}

