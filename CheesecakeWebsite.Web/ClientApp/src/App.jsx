import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Order from './Pages/Order'
import ViewOrders from './Pages/ViewOrders'

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/order' element={<Order />} />
                <Route path='/vieworders' element={<ViewOrders />} />
            </Routes>
        </Layout>
    );
}

export default App;