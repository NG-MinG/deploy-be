import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import BaseLayout from '../layouts/index';
import Shipments from '../pages/shipments/Shipments';
import Home from '../pages/home/Home';
import SearchLocation from '../pages/searchLocation/SearchLocation';
import NotFound from '../pages/notFound';
import QRChecking from './../pages/QRChecking/QRChecking';
import OrderChecking from '../pages/orderChecking/OrderChecking';
import MyOrder from './../pages/myOrder/MyOrder';
import OrderList from './../pages/orderList/OrderList';
import BackToShoppee from '../pages/linkQR/backToShoppee';

const Navigation = () => {
  const authenticated = true;
  return (
      <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route element={<BaseLayout />}>
            <Route 
              path="/shipments"
              element={<Shipments />}
            />

            <Route 
                path='qr'
                element={<QRChecking />} />

            <Route 
              path="/customer"
            >
              <Route 
                path='checking/:id'
                element={<OrderChecking />} />
              <Route 
                path='my-order'
                element={<MyOrder />} />
              <Route 
                path='orders'
                element={<OrderList />} />

<Route 
                path='back'
                element={<BackToShoppee />} />
            </Route>
          </Route>
      </Routes>
  );
};

export default Navigation;
