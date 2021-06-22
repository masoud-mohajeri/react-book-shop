import {
  addOrderToDB,
  decreceInvestory,
  getOrderInfo,
  getOrderInfoAdmin,
} from '../../Firebase/purchse.utilities';
import { declareError } from '../Errors/errors.actions';
import CardTypes from './shCard.types';

// Sync
export const addToShCard = (prod) => ({
  type: CardTypes.ADD_TO_CARD,
  payload: prod,
});

export const removeFromCard = (id) => ({
  type: CardTypes.REMOVE_FROM_CARD,
  payload: id,
});

export const cleareCard = () => ({
  type: CardTypes.CLEAR_CARD,
});

export const increaseCount = (id) => ({
  type: CardTypes.INCREASE_COUNT,
  payload: id,
});

export const decreaseCount = (id) => ({
  type: CardTypes.DECREASE_COUNT,
  payload: id,
});

export const getOwnerOrder = (orders) => ({
  type: CardTypes.GET_ADMIN_ORDER,
  payload: orders,
});

export const getCustomerOrder = (orders) => ({
  type: CardTypes.GET_CUSTOMER_ORDER,
  payload: orders,
});

// Async

export const payTheShCard = (shCard, email, address) => (dispatch) => {
  // save the order
  addOrderToDB({
    books: shCard.bookIdArray,
    owner: email,
    address: address,
  })
    .then((res) => {
      // console.log('save the order ', res);
      // decrese the investory
      for (let prod of shCard.bookIdArray) {
        decreceInvestory(prod.id, prod.Inventory - prod.count)
          .then((res) => {
            // console.log('decrese investory of ', prod.id);
          })
          .catch((err) => {
            console.log('error in decrising investory of ', prod.id);
            dispatch(
              declareError({
                title: '',
                body:
                  'ثبت سفارش با مشکل رو به رو شد ، لطفا دوباره امتحان کنید ',
                spinner: true,
                dismiss: true,
              })
            );
          });
      }
      // reset the store [ Redux ]
      dispatch(cleareCard());
      dispatch(
        declareError({
          title: '',
          body: 'سفارش با موفقیت ثبت شد ',
          spinner: false,
          dismiss: true,
        })
      );
    })
    .catch((err) => {
      console.log('error in saving the order ', err);
      dispatch(
        declareError({
          title: '',
          body: 'ثبت سفارش با مشکل رو به رو شد ، لطفا دوباره امتحان کنید ',
          spinner: true,
          dismiss: true,
        })
      );
    });
};

export const getCustomerOrdersInfoAction = (customerEmail) => (dispatch) => {
  // console.log('getCustomerOrdersInfoAction : ', customerEmail);
  getOrderInfo(customerEmail).then((res) => {
    // console.log('getOrderInfo : ', res);
    const userOrders = [];
    res.forEach((qr) => {
      userOrders.push(qr.data());
    });
    // console.log('data to dispatch -->', userOrders);
    dispatch(getCustomerOrder(userOrders));
  });
};
export const getAdminOrdersInfoAction = () => (dispatch) => {
  // console.log('getCustomerOrdersInfoAction : ', );
  getOrderInfoAdmin().then((res) => {
    // console.log('getOrderInfo : ', res);
    const userOrders = [];
    res.forEach((qr) => {
      userOrders.push({ ...qr.data(), id: qr.id });
    });
    // console.log('data to dispatch -->', userOrders);
    dispatch(getOwnerOrder(userOrders));
  });
};
