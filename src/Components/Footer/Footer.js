import React, { useState } from 'react';
import styles from './footer.style.module.scss';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Material
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

function Footer(props) {
  const [navValue, setNavValue] = useState(props.history.location.pathname);
  // console.log(props.history.location.pathname);
  // console.log(navValue);
  const { user } = useSelector((state) => ({ user: state.user }));
  return (
    <BottomNavigation
      className={styles.footer}
      showLabels
      value={navValue}
      onChange={(event, newValue) => {
        // console.log(event);
        setNavValue(newValue);
      }}
    >
      <BottomNavigationAction
        component={Link}
        to=''
        label='خانه'
        value='/'
        icon={<HomeIcon />}
      />
      {user.userRole === 'admin' ? (
        <BottomNavigationAction
          component={Link}
          to='/admin'
          label='ادمین'
          value='/admin'
          icon={<SupervisorAccountIcon />}
        />
      ) : null}
      {user.userRole === 'customer' ? (
        <BottomNavigationAction
          component={Link}
          to='/customer'
          label='مشتری'
          value='/customer'
          icon={<SupervisedUserCircleIcon />}
        />
      ) : null}
      {user.userRole === 'customer' ? (
        <BottomNavigationAction
          component={Link}
          to='/products'
          label='محصولات'
          value='/products'
          icon={<MenuBookIcon />}
        />
      ) : null}
      {user.userRole === 'customer' ? (
        <BottomNavigationAction
          component={Link}
          to='/shopping-card'
          label='سبد خرید'
          value='/shopping-card'
          icon={<ShoppingCartIcon />}
        />
      ) : null}
    </BottomNavigation>
  );
}

export default withRouter(Footer);
