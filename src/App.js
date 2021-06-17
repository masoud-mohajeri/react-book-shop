import React from 'react';
import './App.scss';
import MainLayout from './Hoc/MainLayout/MainLayout';
import { Switch, Route } from 'react-router-dom';
// Pages
import Home from './Pages/Home/home';
import Login from './Pages/login/login';
import Admin from './Pages/admin/admin';
import Customer from './Pages/customer/customer';
import Products from './Pages/products/products';
import ShoppingCard from './Pages/shopping-card/shoppingCard';
import RTL from './Hoc/RTL/RTL';
// import Modal from './Components/Modal/Modal';

function App() {
  return (
    <React.Fragment>
      <RTL>
        <Switch>
          {/* Home */}
          <Route
            path='/'
            exact
            render={() => (
              <MainLayout>
                <Home></Home>
              </MainLayout>
            )}
          ></Route>
          {/* login */}
          <Route
            path='/login'
            exact
            render={() => (
              <MainLayout>
                <Login></Login>
              </MainLayout>
            )}
          ></Route>
          {/* admin */}
          <Route
            path='/admin'
            exact
            render={() => (
              <MainLayout>
                <Admin></Admin>
              </MainLayout>
            )}
          ></Route>
          {/* Customer */}
          <Route
            path='/customer'
            exact
            render={() => (
              <MainLayout>
                <Customer></Customer>
              </MainLayout>
            )}
          ></Route>
          {/* Products */}
          <Route
            path='/products'
            exact
            render={() => (
              <MainLayout>
                <Products></Products>
              </MainLayout>
            )}
          ></Route>
          {/* ShoppingCard */}
          <Route
            path='/shopping-card'
            exact
            render={() => (
              <MainLayout>
                <ShoppingCard></ShoppingCard>
              </MainLayout>
            )}
          ></Route>
        </Switch>
        {/* <Modal></Modal> */}
      </RTL>
    </React.Fragment>
  );
}

export default App;
