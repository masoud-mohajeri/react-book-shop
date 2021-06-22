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
import PostOrder from '../../Components/PostOrder/PostOrder';
import { postOrder } from '../../Firebase/purchse.utilities';
import { declareError } from '../../Redux/Errors/errors.actions';
import { getAdminOrdersInfoAction } from '../../Redux/shcard/shCard.actions';

const mapState = ({ products, card }) => ({
  products: products.products,
  orders: card.adminOrders,
});

function Admin() {
  const [admin, setAdmin] = useState('order');
  // const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const { products, orders } = useSelector(mapState);

  useEffect(() => {
    dispatch(GetAllProdsFromDB());
    dispatch(getAdminOrdersInfoAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabs = (n, newValue) => {
    setAdmin(newValue);
  };

  const addProdSubmit = (value) => {
    dispatch(SaveProduct(value));
  };

  const prodEditDispatcher = (prod) => {
    dispatch(editProdAction(prod));
  };

  const deleteActionDispatcher = (id) => {
    dispatch(deleteProductAction(id));
  };

  const postOrderCodeSubmiter = (id, postalCode) => {
    dispatch(
      declareError({
        body: 'لطفا کمی صبر کنید',
        title: '',
        spinner: true,
        dismiss: false,
      })
    );
    postOrder(id, postalCode)
      .then((res) => {
        dispatch(
          declareError({
            body: 'کالا با موفقیت ارسال شد ',
            title: '',
            spinner: false,
            dismiss: true,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          declareError({
            body: 'مشکلی در ارسال وجود دارد ، لطفا دوباره امتحان کنید ',
            title: '',
            spinner: false,
            dismiss: true,
          })
        );
      });
  };

  let toEdit = null;
  if (products === null) {
    toEdit = <CircularProgress />;
  } else if (products.length === 0) {
    toEdit = <h2>کتابی موجود نیست</h2>;
  } else if (products.length !== 0) {
    toEdit = products.map((prod, index) => {
      // console.log('id', prod.id);
      return (
        <BookEditor
          key={index}
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
        <Tab label=' سفارشات ارسال نشده' value='order' />
      </Tabs>

      <div>
        {admin === 'edit' ? (
          <div className={styles.marginb}>{toEdit}</div>
        ) : admin === 'add' ? (
          <div className={styles.container}>
            <AddProdForm
              submitHelper={addProdSubmit}
              redButton={{ text: 'پاک کردن ' }}
            ></AddProdForm>
          </div>
        ) : admin === 'order' ? (
          <div className={styles.container}>
            {!orders ? (
              <CircularProgress />
            ) : orders.length === 0 ? (
              <h2> سفارشی ثبت نشده </h2>
            ) : (
              orders.map((ord) => (
                <PostOrder
                  key={ord.id}
                  status='admin'
                  info={ord}
                  sendHandler={postOrderCodeSubmiter}
                ></PostOrder>
              ))
            )}
            {/* <pre>{JSON.stringify(orders, null, 2)}</pre> */}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Admin;
