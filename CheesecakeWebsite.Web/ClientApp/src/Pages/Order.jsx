import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from "dayjs";

const flavors = ['Classic', 'Chocolate', 'Red Velvet', 'Brownie']
const toppingsList = [
    { name: 'Chocolate Chips', selected: false },
    { name: 'Caramel Drizzle', selected: false },
    { name: 'Whipped Cream', selected: false },
    { name: 'Pecans', selected: false },
    { name: 'Almonds', selected: false },
    { name: 'Toasted Coconut', selected: false },
    { name: 'Graham Cracker Crumble', selected: false },
    { name: 'Cookie Dough', selected: false },
    { name: 'Mint Chocolate Chips', selected: false },
    { name: 'Caramelized Bananas', selected: false },
    { name: 'Rainbow Sprinkles', selected: false },
    { name: 'Powdered Sugar', selected: false },
    { name: 'White Chocolate Shavings', selected: false },
    { name: 'Peanut Butter Drizzle', selected: false },
    { name: 'Dark Chocolate Drizzle', selected: false },
]



const Order = () => {

    const navigate = useNavigate();

    const [order, setOrder] = useState({
        name: '',
        email: '',
        baseFlavor: 'Choose...',
        toppings: '',
        specialRequests: '',
        quantity: 1,
        deliveryDate: '',
        total: 0
    })



    const onTextChange = e => {
        const copy = { ...order }
        copy[e.target.name] = e.target.value
        setOrder(copy)
    }

    const onFlavorChange = e => {
        let copy = { ...order }
        const { value } = e.target
        copy.baseFlavor = value
        copy.total = updatePrice(value)
        setOrder(copy)
    }

    const onCheckChange = e => {
        const { name } = e.target
        let selected = toppingsList.find(t => t.name === name)
        selected.selected = !selected.selected
        updateChosenToppings()
    }

    const updateChosenToppings = () => {
        const copy = { ...order }
        copy.toppings = toppingsList.filter(t => t.selected === true).map(t => t.name).join(', ')
        copy.total = updatePrice()
        setOrder(copy)
    }

    const updatePrice = bf => {
        let sum = 0
        if (bf !== 'Choose...') {
            sum = (order.quantity * 49.99) + (toppingsList.filter(t => t.selected === true).length * 3.95)
            return sum
        }
        return 0
    }

    const onQuantityChange = e => {
        const copy = { ...order }
        copy.quantity = e.target.value
        copy.total = (copy.quantity * 49.99) + (toppingsList.filter(t => t.selected === true).length * 3.95)
        setOrder(copy)
    }

    const onResetClick = () => {
        const reset = {
            name: '',
            email: '',
            baseFlavor: 'Choose...',
            toppings: '',
            specialRequests: '',
            quantity: 1,
            deliveryDate: '',
            total: 0
        }

        setOrder(reset)
    }

    const onSubmitClick = async () => {
        await axios.post('/api/cheesecake/add', order)
        navigate('/success')
    }

    const { name, email, baseFlavor, toppings, specialRequests, quantity, deliveryDate, total } = order

    const isFormValid = !!name && !!email && baseFlavor !== 'Choose...' && !!deliveryDate


    return (
        <div className='container' style={{ marginTop: '80px' }}>
            <h1 className='text-center m-4'>Cheeesy Creations Order Form</h1>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='mb-3'>
                        <label className='form-label'>Name</label>
                        <input type='text' className='form-control' name='name' onChange={onTextChange} value={name} placeholder='Enter your name'></input>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Email</label>
                        <input type='email' className='form-control' name='email' value={email} onChange={onTextChange} placeholder='Enter your Email Address'></input>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Base Flavor ($49.99)</label>
                        <select className='form-select' onChange={onFlavorChange}>
                            <option value='Choose...'>Choose...</option>
                            {flavors.map(flavor => <option value={flavor} key={flavor}>{flavor}</option>)}
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Toppings (each topping adds an additional $3.95)</label>
                        {toppingsList.map(t => <div className='form-check'>
                            <input className='form-check-input' type='checkbox' name={t.name} onChange={onCheckChange} key={t} ></input>
                            <label className='form-check-label'>{t.name}</label>
                        </div>)}
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Special Requests</label>
                        <textarea className='form-control' rows='3' name='specialRequests' onChange={onTextChange} value={specialRequests}></textarea>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Quantity</label>
                        <input type='number' className='form-control' min='1' onChange={onQuantityChange} value={quantity}></input>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Delivey Date</label>
                        <input type='date' className='form-control' name='deliveryDate' onChange={onTextChange} value={deliveryDate}></input>
                    </div>
                    <button type='submit' disabled={!isFormValid} className='btn btn-primary' onClick={onSubmitClick}>Submit Order</button>
                </div>
                <div className='col-md-6 position-sticky' style={{ top: '2rem' }}>
                    <h2 className='mb-4'>Live Preview</h2>
                    <div className='card' style={{ width: '18rem' }}>
                        <img source='https://react-cheesecake-ordering.lit-projects.com/cheesecake.jpg' className='card-img-top' alt='Cheesecake'></img>
                        <div className='card-body'>
                            <h5 className='card-title'>Your custom Cheesecake</h5>
                            <p className='card-text'>Base: {baseFlavor}</p>
                            <p className='card-text'>Toppings: {toppings}</p>
                            <p className='card-text'>Special Requests: {specialRequests}</p>
                            <p className='card-text'>Quantity: {quantity}</p>
                            <p className='card-text'>Delivery Date: {dayjs(deliveryDate).format('MM/DD/YY')}</p>
                            <p className='card-text fw-bold'>Total: ${total.toFixed(2)}</p>
                        </div>
                    </div>
                    <br></br>
                    <button className="btn btn-lg btn-primary" onClick={onResetClick}>Reset Order</button>
                </div>
            </div>
        </div>
    );
};

export default Order;