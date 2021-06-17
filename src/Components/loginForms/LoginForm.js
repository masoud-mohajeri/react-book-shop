import React, { useState } from 'react';
import styles from './loginForm.styles.module.scss';
import { useFormik } from 'formik';
import * as yup from 'yup';
// material
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { InputAdornment } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import { ButtonGroup } from '@material-ui/core';
// redux
import { useSelector } from 'react-redux';

const mapState = ({ user }) => ({
  user: user,
});
function LoginForm(props) {
  const { user } = useSelector(mapState);

  const [pass, setPass] = useState(false);

  const togglePass = () => {
    setPass(!pass);
  };

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    values,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email(' ایمیل معتبر نیست ')
        .required(' این فیلد الزامی است'),
      password: yup
        .string()
        .min(6, ' رمز عبور حداقل 6 کارکتر است ')
        .required(' این فیلد الزامی است'),
    }),
    onSubmit: (values) => {
      new Promise((resolve, reject) => {
        props.emailLogin(values.email, values.password);
        resolve('done');
      }).then((res) => {
        // if (user.userExists) {
        resetForm();
        // }
      });
    },
  });

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          className={styles.TextField}
          id='email'
          type='email'
          name='email'
          label='ایمیل'
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AlternateEmailIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>
        <div className={styles.error}>
          {touched.email && errors.email ? errors.email : null}
        </div>
        <TextField
          className={styles.TextField}
          id='password'
          type={pass ? 'text' : 'password'}
          name='password'
          label='رمز ورود'
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{
            startAdornment: (
              <div className={styles.pointer}>
                {pass ? (
                  <VisibilityIcon onClick={togglePass} />
                ) : (
                  <VisibilityOffIcon onClick={togglePass} />
                )}
              </div>
            ),
          }}
        ></TextField>
        <div className={styles.error}>
          {touched.password && errors.password ? errors.password : null}
        </div>
        <ButtonGroup color='primary' fullWidth>
          <Button
            onClick={props.googleAuth}
            color='secondary'
            variant='contained'
            type='button'
          >
            Google Login
          </Button>
          <Button variant='contained' color='primary' type='submit'>
            ورود
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

export default LoginForm;
