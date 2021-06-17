import React, { useState } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import LoginForm from '../../Components/loginForms/LoginForm';
import RegisterForm from '../../Components/loginForms/RegisterForm';
import styles from './login.page.module.scss';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { declareError, resolveError } from '../../Redux/Errors/errors.actions';
import {
  userLoginEmail,
  LoginWithGoogle,
  RegistrationAction,
} from '../../Redux/user/user.actions';

function Login() {
  const { userState, errorState } = useSelector((state) => ({
    error: state.error,
    user: state.user,
  }));

  const dispatch = useDispatch();

  const [form, setForm] = useState('login');

  const formTabs = (n, newValue) => {
    setForm(newValue);
  };

  const handleEmailLogin = (email, password) => {
    dispatch(userLoginEmail(email, password));
  };

  const handleGoogleLogin = () => {
    dispatch(LoginWithGoogle());
  };

  const handleRegister = (name, email, password, role) => {
    dispatch(RegistrationAction(name, email, password, role));
  };

  return (
    <div className={styles['forms-container']}>
      <Tabs
        className={styles.tabs}
        value={form}
        onChange={formTabs}
        indicatorColor='primary'
        textColor='primary'
      >
        <Tab label='ورود' value='login' />
        <Tab label='ثبت نام' value='register' />
      </Tabs>

      <div>
        {form === 'login' ? (
          <LoginForm
            googleAuth={handleGoogleLogin}
            emailLogin={handleEmailLogin}
          ></LoginForm>
        ) : (
          <RegisterForm register={handleRegister}></RegisterForm>
        )}
      </div>
    </div>
  );
}

export default Login;
