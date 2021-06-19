import React, { useState, useEffect } from 'react';
import AddProdForm from '../../Components/addProdForm/AddProdForm';
import styles from './admin.styles.module.scss';
import {
  editProdAction,
  deleteProductAction,
  GetAllProdsFromDB,
  SaveProduct,
} from '../../Redux/products/products.actions';
import { useSelector, useDispatch } from 'react-redux';
import BookEditor from '../../Components/BookEditor/BookEditor';
// material
import { CircularProgress, Tab, Tabs } from '@material-ui/core';

const mapState = ({ products }) => ({ products: products.products });

function Admin() {
  const [admin, setAdmin] = useState('edit');
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);

  useEffect(() => {
    dispatch(GetAllProdsFromDB());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabs = (n, newValue) => {
    setAdmin(newValue);
  };

  const addProdSubmit = (value) => {
    dispatch(SaveProduct(value));
  };

  const prodEditDispatcher = (prod) => {
    console.log('edit', prod);
    dispatch(editProdAction(prod));
  };

  const deleteActionDispatcher = (id) => {
    console.log('delete', id);
    dispatch(deleteProductAction(id));
  };

  let toEdit = null;
  if (products === null) {
    toEdit = <CircularProgress />;
  } else if (products.length === 0) {
    toEdit = <h2>کتابی موجود نیست</h2>;
  } else if (products.length !== 0) {
    toEdit = products.map((prod) => {
      // console.log(prod);
      return (
        <BookEditor
          key={prod.id}
          initialValues={prod}
          deleteProdHandler={deleteActionDispatcher}
          editProdSubmit={prodEditDispatcher}
        ></BookEditor>
      );
    });
  }

  return (
    <div className={styles.body}>
      <Tabs
        className={styles.tabs}
        value={admin}
        onChange={handleTabs}
        indicatorColor='primary'
        textColor='primary'
      >
        <Tab label='اضافه کردن' value='add' />
        <Tab label='اصلاح' value='edit' />
      </Tabs>

      <div>
        {admin === 'edit' ? (
          toEdit
        ) : admin === 'add' ? (
          <AddProdForm
            submitHelper={addProdSubmit}
            redButton={{ text: 'پاک کردن ' }}
          ></AddProdForm>
        ) : null}
      </div>
    </div>
  );
}

export default Admin;
