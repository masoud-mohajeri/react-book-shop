import React, { useState } from 'react';
import styles from './footer.style.module.scss';
import { Link, withRouter } from 'react-router-dom';
// Material
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import RestoreIcon from '@material-ui/icons/Restore';

function Footer(props) {
  const [navValue, setNavValue] = useState(props.history.location.pathname);
  // console.log(props.history.location.pathname);
  // console.log(navValue);
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
        label='home'
        value='/'
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to='/admin'
        label='Admin'
        value='/admin'
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to='/login'
        label='ورود'
        value='/login'
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to='/customer'
        label='customer'
        value='/customer'
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to='/products'
        label='products'
        value='/products'
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to='/shopping-card'
        label='shopping-card'
        value='/shopping-card'
        icon={<RestoreIcon />}
      />
    </BottomNavigation>
  );
}

export default withRouter(Footer);
