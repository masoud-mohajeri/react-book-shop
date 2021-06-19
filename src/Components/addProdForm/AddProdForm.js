import React, { useState, useEffect } from 'react';
import styles from './addProdForm.styles.module.scss';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { uploadHandler } from '../../Firebase/prods.utilitis';
import { declareError, resolveError } from '../../Redux/Errors/errors.actions';
// Material
import { Button, ButtonGroup, TextField } from '@material-ui/core';
// Redux
import { useDispatch } from 'react-redux';
// assets
import bookAsset from '../../assets/Images/book.png';

function AddProdForm(props) {
  const dispatch = useDispatch();
  const [url, setUrl] = useState(props.initialValues.imageUrl);
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
      name: props.initialValues.name,
      price: props.initialValues.price,
      Inventory: props.initialValues.Inventory,
      imageUrl: '',
      description: props.initialValues.description,
    },
    validationSchema: yup.object().shape({
      name: yup.string('').required(' این فیلد الزامی است'),
      price: yup.number().required(' این فیلد الزامی است'),
      Inventory: yup.number('').required(' این فیلد الزامی است'),
      imageUrl: yup.string(''),
      description: yup.string('').required(' این فیلد الزامی است'),
    }),
    onSubmit: () => {
      formSubmitHandler(values);
    },
  });

  const formSubmitHandler = (values) => {
    props.submitHelper({
      name: values.name,
      price: values.price,
      Inventory: values.Inventory,
      imageUrl: url,
      description: values.description,
      ...(props.redButton.text !== 'edit ' && { id: props.initialValues.id }),
    });
    setUrl(props.initialValues.imageUrl);
  };

  const imageChangeHandler = (event) => {
    dispatch(
      declareError({
        title: '',
        body: 'لطفا کمی صبر کنید ',
        spinner: true,
        dismiss: false,
      })
    );
    uploadHandler(event.target.files[0])
      .then((dlUrl) => {
        setUrl(dlUrl);
        dispatch(resolveError());
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          declareError({
            title: '',
            body: 'خطایی در آپلود عکی پیش آمده ، لطفا با فیلتر شکن امتحان کنید',
            spinner: false,
            dismiss: true,
          })
        );
      });
  };

  const deleteHandler = () => {
    props.redButton.action(props.initialValues.id);
  };

  useEffect(() => {
    resetForm();
    setUrl(props.initialValues.imageUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const RedButtonHandler = () => {
    if (props.redButton.type === 'edit') {
      return deleteHandler();
    } else {
      return resetForm();
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          className={styles.TextField}
          id='name'
          type='text'
          name='name'
          label='نام کتاب'
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        ></TextField>
        <div className={styles.error}>
          {touched.name && errors.name ? errors.name : null}
        </div>
        <TextField
          className={styles.TextField}
          id='price'
          type='number'
          name='price'
          label='قیمت کتاب'
          value={values.price}
          onChange={handleChange}
          onBlur={handleBlur}
        ></TextField>
        <div className={styles.error}>
          {touched.price && errors.price ? errors.price : null}
        </div>
        <TextField
          className={styles.TextField}
          id='Inventory'
          type='number'
          name='Inventory'
          label='موجودی کتاب'
          value={values.Inventory}
          onChange={handleChange}
          onBlur={handleBlur}
        ></TextField>
        <div className={styles.error}>
          {touched.Inventory && errors.Inventory ? errors.Inventory : null}
        </div>
        <TextField
          className={styles.TextField}
          id='imageUrl'
          type='file'
          name='imageUrl'
          label='عکس کتاب'
          value={values.imageUrl}
          onChange={imageChangeHandler}
          onBlur={handleBlur}
        ></TextField>
        <div className={styles.error}>
          {touched.imageUrl && !url ? ' این فیلد الزامی است' : null}
        </div>
        <TextField
          className={styles.TextField}
          id='description'
          type='text'
          name='description'
          label='توضیحات'
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          multiline
        ></TextField>
        <div className={styles.error}>
          {touched.description && errors.description
            ? errors.description
            : null}
        </div>
        <div className={styles.showImg}>
          <img src={url || bookAsset} alt='aks ketab ' />
        </div>
        <ButtonGroup className={styles.formButton}>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            className={styles.formButton}
            disabled={!url}
          >
            ثبت
          </Button>
          <Button
            color='secondary'
            variant='contained'
            className={styles.formButton}
            onClick={RedButtonHandler}
          >
            {props.redButton.type === 'edit' ? 'حذف' : 'پاک کردن'}
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

AddProdForm.defaultProps = {
  initialValues: {
    name: '',
    price: '',
    Inventory: '',
    imageUrl: '',
    description: '',
  },
};

export default AddProdForm;
