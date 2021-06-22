import CardTypes from './shCard.types';

const initialValues = {
  bookIdArray: [],
  totalPrice: 0,
  customerOrders: [],
  adminOrders: [],
};

const ShCardReducer = (state = initialValues, action) => {
  switch (action.type) {
    case CardTypes.ADD_TO_CARD:
      return {
        ...state,
        totalPrice: state.totalPrice + action.payload.price,
        bookIdArray: [...state.bookIdArray, { ...action.payload, count: 1 }],
      };
    case CardTypes.INCREASE_COUNT:
      let thePrice = 0;
      let newBook = state.bookIdArray.map((book) => {
        if (book.id === action.payload) {
          thePrice = book.price;
          return { ...book, count: book.count + 1 };
        } else {
          return book;
        }
      });
      return {
        ...state,
        totalPrice: state.totalPrice + thePrice,
        bookIdArray: newBook,
      };
    case CardTypes.DECREASE_COUNT:
      let thePriceDec = 0;
      let ShouldDelete = false;
      let newBookDec = state.bookIdArray.map((book) => {
        if (book.id === action.payload) {
          thePriceDec = book.price;
          if (book.count === 1) {
            ShouldDelete = true;
          }
          return { ...book, count: book.count - 1 };
        } else {
          return book;
        }
      });
      if (ShouldDelete) {
        newBookDec = state.bookIdArray.filter(
          (book) => book.id !== action.payload
        );
      }
      return {
        ...state,
        totalPrice: state.totalPrice - thePriceDec,
        bookIdArray: newBookDec,
      };
    case CardTypes.CLEAR_CARD:
      return {
        bookIdArray: [],
        totalPrice: 0,
      };
    case CardTypes.GET_ADMIN_ORDER:
      return {
        ...state,
        adminOrders: action.payload,
      };
    case CardTypes.GET_CUSTOMER_ORDER:
      return {
        ...state,
        customerOrders: action.payload,
      };
    default:
      return state;
  }
};

export default ShCardReducer;
