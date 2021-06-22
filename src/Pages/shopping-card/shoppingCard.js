import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { GetAllProdsFromDB } from '../../Redux/products/products.actions';
import {
  decreaseCount,
  increaseCount,
  payTheShCard,
} from '../../Redux/shcard/shCard.actions';
import styles from './shoppingC.styles.module.scss';
import { declareError } from '../../Redux/Errors/errors.actions';

//
const mapState = (state) => ({
  products: state.products.products,
  shCard: state.card,
  user: state.user,
});

function ShoppingCard(props) {
  const { user, shCard } = useSelector(mapState);
  const dispatch = useDispatch();
  const [address, setAddress] = useState();

  useEffect(() => {
    dispatch(GetAllProdsFromDB());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const increaseCountHandler = (id) => {
    dispatch(increaseCount(id));
  };

  const decreaseCountHandler = (id) => {
    dispatch(decreaseCount(id));
  };

  const paymentHandler = () => {
    if (!address) {
      dispatch(
        declareError({
          title: '',
          body: 'وجود آدرس اجباری است',
          spinner: false,
          dismiss: true,
        })
      );
      return;
    }

    if (shCard.bookIdArray.length === 0) {
      dispatch(
        declareError({
          title: '',
          body: 'سبد خرید شما خالی است',
          spinner: false,
          dismiss: true,
        })
      );
      return;
    }

    if (!user.userExists) {
      dispatch(
        declareError({
          title: '',
          body: 'برای پرداخت لطفا وارد شوید',
          spinner: false,
          dismiss: true,
        })
      );
      return;
    }
    dispatch(
      declareError({
        title: '',
        body: 'لطفا کمی صبر کنید',
        spinner: true,
        dismiss: false,
      })
    );
    dispatch(payTheShCard(shCard, user.userEmail, address));
  };

  const addressHandler = (e) => {
    setAddress(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.total}>
          {' '}
          قیمت : {shCard.totalPrice} <small> تومان</small>
        </div>
        <TextField
          multiline
          label='آدرس'
          variant='outlined'
          onChange={addressHandler}
        />
        <Button variant='contained' onClick={paymentHandler} color='primary'>
          پرداخت
        </Button>
      </div>

      <div className={styles.prods}>
        {shCard.bookIdArray.map((book) => {
          return (
            <Grid container key={book.id}>
              <Grid item xs={3}>
                <img
                  className={styles.image}
                  src={book.imageUrl}
                  alt='img of prod'
                />
              </Grid>
              <Grid item xs={3}>
                <h4> نام کتاب : {book.name}</h4>
              </Grid>
              <Grid item xs={3}>
                <h4> موجودی : {book.Inventory}</h4>
              </Grid>
              <Grid item xs={3}>
                <Button
                  disabled={book.count === book.Inventory}
                  onClick={() => increaseCountHandler(book.id)}
                >
                  <ExpandLess />
                </Button>
                <div> count : {book.count} </div>
                <Button
                  disabled={book.count === 0}
                  onClick={() => decreaseCountHandler(book.id)}
                >
                  <ExpandMore />
                </Button>
              </Grid>
            </Grid>
          );
        })}
      </div>
    </div>
  );
}

export default ShoppingCard;
