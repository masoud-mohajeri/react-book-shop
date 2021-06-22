import React from 'react';
import './App.scss';
import MainLayout from './Hoc/MainLayout/MainLayout';
import { Switch, Route, Redirect } from 'react-router-dom';
// Pages
import Home from './Pages/Home/home';
import Login from './Pages/login/login';
import Admin from './Pages/admin/admin';
import Customer from './Pages/customer/customer';
import Products from './Pages/products/products';
import ShoppingCard from './Pages/shopping-card/shoppingCard';
import RTL from './Hoc/RTL/RTL';
import { useSelector } from 'react-redux';
// import Modal from './Components/Modal/Modal';

function App() {
  const { user } = useSelector((state) => ({ user: state.user }));
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
            render={() =>
              user.userExists ? (
                <Redirect to='/' />
              ) : (
                <MainLayout>
                  <Login></Login>
                </MainLayout>
              )
            }
          ></Route>
          {/* admin */}
          <Route
            path='/admin'
            exact
            render={() =>
              user.userRole !== 'admin' ? (
                <Redirect to='/' />
              ) : (
                <MainLayout>
                  <Admin></Admin>
                </MainLayout>
              )
            }
          ></Route>
          {/* Customer */}
          <Route
            path='/customer'
            exact
            render={() =>
              user.userExists && user.userRole === 'customer' ? (
                <MainLayout>
                  <Customer></Customer>
                </MainLayout>
              ) : (
                <Redirect to='/' />
              )
            }
          ></Route>
          {/* Products */}
          <Route
            path='/products'
            exact
            render={() =>
              user.userRole === 'customer' ? (
                <MainLayout>
                  <Products></Products>
                </MainLayout>
              ) : (
                <Redirect to='/' />
              )
            }
          ></Route>
          {/* ShoppingCard */}
          <Route
            path='/shopping-card'
            exact
            render={() =>
              user.userRole === 'customer' ? (
                <MainLayout>
                  <ShoppingCard></ShoppingCard>
                </MainLayout>
              ) : (
                <Redirect to='/' />
              )
            }
          ></Route>
        </Switch>
        {/* <Modal></Modal> */}
      </RTL>
    </React.Fragment>
  );
}

export default App;
