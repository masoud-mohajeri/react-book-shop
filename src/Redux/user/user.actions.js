import userTypes from './user.types';
import { declareError } from '../Errors/errors.actions';
import {
  GetUser,
  LoginWithEmail,
  signinWithGoogle,
  RegWithEmail,
  SaveUser,
  UnregisterEmail,
} from '../../Firebase/auth.utilitis';
//
import { push } from 'react-router-redux';

export const userLogin = (user) => {
  return {
    type: userTypes.USER_LOGIN,
    payload: user,
  };
};
export const userOut = () => {
  return {
    type: userTypes.USER_LOGOUT,
  };
};

export const userLoginEmail = (email, password) => async (dispatch) => {
  dispatch(
    declareError({
      body: 'لطفا کمی صبر کنید',
      title: '',
      spinner: true,
      dismiss: false,
    })
  );
  try {
    const login = await LoginWithEmail(email, password);

    const userInfo = await GetUser(login.user.uid);
    if (userInfo.exists) {
      dispatch(userLogin(userInfo.data()));
      dispatch(
        declareError({
          body: 'شما با موفقیت وارد شدید ',
          title: '',
          spinner: false,
          dismiss: true,
        })
      );
    } else {
      dispatch(
        declareError({
          title: '',
          body: 'مشکلی در ارتباط وجود دارد ، لطفا دوباره امتحان کنید ',
          spinner: false,
          dismiss: true,
        })
      );
    }
  } catch (error) {
    dispatch(
      declareError({
        title: '',
        body: 'مشکلی در ارتباط وجود دارد ، لطفا دوباره امتحان کنید ',
        spinner: false,
        dismiss: true,
      })
    );
    throw new Error(error);
  }
};

export const LoginWithGoogle = () => async (dispatch) => {
  dispatch(
    declareError({
      body: 'لطفا کمی صبر کنید',
      title: '',
      spinner: true,
      dismiss: false,
    })
  );
  try {
    const login = await signinWithGoogle();
    const userInfo = await GetUser(login.user.uid);
    console.log(userInfo.data());
    if (userInfo.exists) {
      dispatch(
        declareError({
          body: 'شما با موفقیت وارد شدید ',
          title: '',
          spinner: false,
          dismiss: true,
        })
      );
      //
      dispatch(userLogin(userInfo.data()));
      dispatch(push('/'));
    } else {
      const unReg = await UnregisterEmail();
      dispatch(
        declareError({
          title: '',
          body: 'لطفا نسبت به ثبت نام اقدام نمایید ',
          spinner: false,
          dismiss: true,
        })
      );
    }
  } catch (error) {
    dispatch(
      declareError({
        title: '',
        body: 'مشکلی در ارتباط وجود دارد ، لطفا دوباره امتحان کنید ',
        spinner: false,
        dismiss: true,
      })
    );
    throw new Error(error);
  }
};

export const RegistrationAction = (name, email, password, role) => async (
  dispatch
) => {
  dispatch(
    declareError({
      body: 'لطفا کمی صبر کنید',
      title: '',
      spinner: true,
      dismiss: false,
    })
  );
  try {
    const reg = await RegWithEmail(email, password);
    const save = await SaveUser({ uid: reg.user.uid, name, email, role });
    dispatch(
      userLogin({
        name,
        email,
        role,
      })
    );
    dispatch(
      declareError({
        body: 'ثبت نام با موفقیت انجام شد',
        title: '',
        spinner: false,
        dismiss: true,
      })
    );
  } catch (error) {
    console.log(error.message);

    if (error.code === 'auth/email-already-in-use') {
      dispatch(
        declareError({
          title: '',
          body: 'ایمیل وارد شده قبلا ثبت نام شده است  ',
          spinner: false,
          dismiss: true,
        })
      );
    } else {
      const unReg = await UnregisterEmail();

      dispatch(
        declareError({
          title: '',
          body: 'مشکلی در ارتباط وجود دارد ، لطفا دوباره امتحان کنید ',
          spinner: false,
          dismiss: true,
        })
      );
      throw new Error(error);
    }
  }
};
