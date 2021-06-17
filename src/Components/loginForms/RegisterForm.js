import React, { useState } from 'react';
import styles from './loginForm.styles.module.scss';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormControlLabel, RadioGroup, TextField } from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
// redux
import { useSelector } from 'react-redux';

const mapState = ({ user }) => ({
  user: user,
});

function RegisterForm(props) {
  const { user } = useSelector(mapState);

  const [formError, setFormError] = useState('');

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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(' این فیلد الزامی است'),
      email: yup
        .string()
        .email(' ایمیل معتبر نیست ')
        .required(' این فیلد الزامی است'),
      password: yup
        .string()
        .min(6, ' رمز عبور حداقل 6 کارکتر است ')
        .required(' این فیلد الزامی است'),

      confirmPassword: yup.string().required(' این فیلد الزامی است'),

      role: yup.string().required(' این فیلد الزامی است'),
    }),
    onSubmit: (values) => {
      handleRegisterForm(values);
      if (user.userExists) {
        resetForm();
      }
    },
  });

  const handleRegisterForm = (val) => {
    if (val.password !== val.confirmPassword) {
      setFormError('رمزهای عبور مطابقت ندارند');
      return;
    }
    setFormError('');
    console.log(val);
    props.register(values.name, values.email, values.password, values.role);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          className={styles.TextField}
          id='name'
          type='text'
          name='name'
          label='نام '
          position='start'
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        ></TextField>
        <div className={styles.error}>
          {touched.name && errors.name ? errors.name : null}
        </div>
        <TextField
          className={styles.TextField}
          id='email'
          type='text'
          name='email'
          label='ایمیل '
          position='start'
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
        ></TextField>
        <div className={styles.error}>
          {touched.email && errors.email ? errors.email : null}
        </div>
        <TextField
          className={styles.TextField}
          id='password'
          type='text'
          name='password'
          label='رمز ورود'
          position='start'
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
        ></TextField>
        <div className={styles.error}>
          {touched.password && errors.password ? errors.password : null}
        </div>
        <TextField
          className={styles.TextField}
          id='confirmPassword'
          type='text'
          name='confirmPassword'
          label=' تایید رمز ورود'
          position='start'
          value={values.confirmPassword}
          onBlur={handleBlur}
          onChange={handleChange}
        ></TextField>
        <div className={styles.error}>
          {touched.confirmPassword && errors.confirmPassword
            ? errors.confirmPassword
            : null}
        </div>
        <FormLabel component='legend'>ثبت نام به عنوان : </FormLabel>
        <RadioGroup name='role' onChange={handleChange} onBlur={handleBlur}>
          <FormControlLabel
            value='customer'
            control={<Radio />}
            label='مشتری'
          />
          <FormControlLabel value='admin' control={<Radio />} label='ادمین' />
        </RadioGroup>
        <div className={styles.error}>
          {touched.role && errors.role ? errors.role : null}
        </div>
        <div className={styles.error}>
          {touched.password && touched.confirmPassword && formError
            ? formError
            : null}
        </div>
        <Button
          className={styles.formButton}
          variant='contained'
          color='primary'
          type='submit'
        >
          ثبت نام
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
