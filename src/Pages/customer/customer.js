import React, { useEffect } from 'react';
import styles from './Customer.styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import PostOrder from '../../Components/PostOrder/PostOrder';
import { getCustomerOrdersInfoAction } from '../../Redux/shcard/shCard.actions';
import { CircularProgress } from '@material-ui/core';

function Customer() {
  const { user, card } = useSelector((state) => ({
    user: state.user,
    card: state.card.customerOrders,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomerOrdersInfoAction(user.userEmail));
    // console.log('eseEffect', user.userEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.userEmail]);

  return (
    <div className={styles.container}>
      {!card ? (
        <CircularProgress />
      ) : card.length === 0 ? (
        <h2> شما هنوز کتابی سفارش نداده اید </h2>
      ) : (
        card.map((c, i) => {
          return (
            <PostOrder
              info={c}
              status='customer'
              sendHandler={() => console.log('h1')}
              key={i}
            ></PostOrder>
          );
        })
      )}
      {/* <pre>{JSON.stringify(card, null, 2)}</pre>; */}
    </div>
  );
}

export default Customer;
