import ProductTypes from './products.types';

const initialState = {
  products: [],
};

const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductTypes.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case ProductTypes.PUT_PRODUCT_LIST:
      return {
        ...state,
        products: action.payload,
      };
    case ProductTypes.DELETE_PRODUCT:
      const deleteProd = state.products.filter((prod) => {
        console.log(prod);
        return prod.id !== action.payload;
      });
      return {
        ...state,
        products: deleteProd,
      };
    case ProductTypes.EDIT_PRODUCT:
      const editProd = state.products.filter(
        (prod) => prod.id !== action.payload.id
      );
      return {
        ...state,
        products: [...editProd, action.payload],
      };
    default:
      return state;
  }
};

export default ProductsReducer;
