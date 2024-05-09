import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import dayjs from "dayjs";

const OrderDetails = () => {

    const { id } = useParams()


    const [order, setOrder] = useState({})

    useEffect(() => {
        const getOrder = async () => {
            console.log(id)
            const { data } = await axios.get(`/api/cheesecake/getbyid?id=${id}`)
            setOrder(data)

        }

        getOrder()
    }, [])



    return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: "80vh" }}>
            <div className="card text-center shadow p-3 mb-5 bg-body rounded" style={{ width: "30rem", backgroundColor: "#f8f9fa" }}>
                <div className="card-body">
                    <h3 className="card-title fw-bold">{order.name}</h3>
                    <p className="card-text fs-5">{order.email}</p>
                    <p className="card-text fs-5">{order.baseFlavor}</p>
                    <p className="card-text fs-5">{order.toppings || 'N/A'}</p>
                    <p className="card-text fs-5">{order.specialRequests || 'N/A'}</p>
                    <p className="card-text fs-5">{order.quantity}</p>
                    <p className="card-text fs-5">{dayjs(order.deliveryDate).format('MM/DD/YY')}</p>
                    <p className="card-text fs-5">${order.total }</p>
                </div>
                <Link to='/viewOrders'>
                    <button className='btn btn-primary w-100'>Back to Orders</button>
                </Link>
            </div>
        </div>
    )
}

export default OrderDetails