import React from 'react';
import styles from './header.styles.module.scss';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { userOut } from '../../Redux/user/user.actions';

function Header(props) {
  const { user } = useSelector((state) => ({ user: state.user }));
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(userOut());
  };
  const logInHandler = () => {
    props.history.push('/login');
  };
  return (
    <div>
      <AppBar position='static'>
        <Toolbar className={styles.appbar}>
          <Typography variant='h6'>📚 کتاب فروشی </Typography>
          {!user.userExists ? (
            <Button onClick={logInHandler} edge='start' color='inherit'>
              وارد شوید
            </Button>
          ) : (
            <Button onClick={logOutHandler} edge='start' color='inherit'>
              خارج شوید
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header);
