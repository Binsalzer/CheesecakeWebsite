import React, { useState } from 'react';
import axios from 'axios';

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
        const {value }=e.target
        copy.baseFlavor = value
        if (copy.total === 0&&value!=='Choose...') {
            copy.total = copy.total + 49.99
        }
        if (value === 'Choose...') {
            copy.total=0
        }
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
        copy.price=copy.price+
        setOrder(copy)
    }

    const test = () => {
        console.log('test')
    }

    const { name, email, baseFlavor, toppings, specialRequests, quantity, deliveryDate, total } = order

    return (
        <div className='container' style={{ marginTop: '80px' }}>
            <h1 className='text-center m-4'>Cheeesy Creations Order Form</h1>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='mb-3'>
                        <label className='form-label'>Name</label>
                        <input type='text' className='form-control' name='name' onChange={onTextChange} placeholder='Enter your name'></input>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Email</label>
                        <input type='email' className='form-control' name='email' onChange={onTextChange} placeholder='Enter your Email Address'></input>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Base Flavor ($49.99)</label>
                        <select className='form-select' onChange={onFlavorChange}>
                            <option value='Choose...'>Choose...</option>
                            {flavors.map(flavor => <option value={flavor}>{flavor}</option>)}
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Toppings (each topping adds an additional $3.95)</label>
                        {toppingsList.map(t => <div className='form-check'>
                            <input className='form-check-input' type='checkbox' name={t.name} onChange={ onCheckChange} ></input>
                            <label className='form-check-label'>{t.name}</label>
                        </div>)}
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Special Requests</label>
                        <textarea className='form-control' rows='3'></textarea>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Quantity</label>
                        <input type='number' className='form-control' min='1' value={order.quantity}></input>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Delivey Date</label>
                        <input type='date' className='form-control'></input>
                    </div>
                    <button type='submit' disabled className='btn btn-primary'>Submit Order</button>
                </div>
                <div className='col-md-6 position-sticky' style={{ top: '2rem' }}>
                    <h2 className='mb-4'>Live Preview</h2>
                    <div className='card' style={{ width: '18rem' }}>
                        <img source='https://react-cheesecake-ordering.lit-projects.com/cheesecake.jpg' className='card-img-top' alt='Cheesecake'></img>
                        <div className='card-body'>
                            <h5 className='card-title'>Your custom Cheesecake</h5>
                            <p className='card-text'>Base: {baseFlavor}</p>
                            <p className='card-text'>Toppings: {toppings }</p>
                            <p className='card-text'>Special Requests: {specialRequests}</p>
                            <p className='card-text'>Quantity: {quantity}</p>
                            <p className='card-text'>Delivery Date: {deliveryDate}</p>
                            <p className='card-text fw-bold'>Total: ${total}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;