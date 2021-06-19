import ProductsTypes from './products.types';
import {
  SaveProductHandler,
  GetProductHandler,
  deleteProductHandler,
  updateProductHandler,
} from '../../Firebase/prods.utilitis';
import { declareError } from '../Errors/errors.actions';
//  Async
export const SaveProduct = (product) => async (dispatch) => {
  dispatch(
    declareError({
      body: 'لطفا کمی صبر کنید',
      title: '',
      spinner: true,
      dismiss: false,
    })
  );
  SaveProductHandler({
    name: product.name,
    price: product.price,
    Inventory: product.Inventory,
    imageUrl: product.imageUrl,
    description: product.description,
  })
    .then((res) => {
      dispatch(
        AddProduct({
          name: product.name,
          price: product.price,
          Inventory: product.Inventory,
          imageUrl: product.imageUrl,
          description: product.description,
          id: res.id,
        })
      );
      dispatch(
        declareError({
          body: 'کالا با موفقیت ثبت شد ',
          title: '',
          spinner: false,
          dismiss: true,
        })
      );
    })
    .catch((err) => {
      dispatch(
        declareError({
          body:
            'مشکلی در ارتباط با سرور وجود دارد ، لطفا با تحریم شکن امتحان کنید ',
          title: '',
          spinner: false,
          dismiss: true,
        })
      );
    });
};

export const deleteProductAction = (id) => (dispatch) => {
  dispatch(
    declareError({
      body: 'لطفا کمی صبر کنید',
      title: '',
      spinner: true,
      dismiss: false,
    })
  );
  deleteProductHandler(id)
    .then((res) => {
      dispatch(
        declareError({
          body: 'کالا با موفقیت حذف شد',
          title: '',
          spinner: false,
          dismiss: true,
        })
      );
      dispatch(deleteProduct(id));
    })
    .catch((err) => {
      dispatch(
        declareError({
          body: 'مشکلی در حذف کالا وجود دارد ، لطفا دوباره امتحان کنید ',
          title: '',
          spinner: false,
          dismiss: true,
        })
      );
      throw new Error(err);
    });
};

export const editProdAction = (prod) => (dispatch) => {
  dispatch(
    declareError({
      body: 'لطفا کمی صبر کنید',
      title: '',
      spinner: true,
      dismiss: false,
    })
  );
  updateProductHandler(prod)
    .then((res) => {
      dispatch(editProduct(prod));
      dispatch(
        declareError({
          body: 'کالا با موفقیت به روز رسانی شد',
          title: '',
          spinner: false,
          dismiss: true,
        })
      );
    })
    .catch((err) => {
      dispatch(
        declareError({
          body:
            'مشکلی در به روز رسانی کالا وجود دارد ، لطفا دوباره امتحان کنید ',
          title: '',
          spinner: false,
          dismiss: true,
        })
      );
      throw new Error(err);
    });
};
// Sync
export const deleteProduct = (id) => ({
  type: ProductsTypes.DELETE_PRODUCT,
  payload: id,
});

export const editProduct = (product) => {
  console.log(product);
  return {
    type: ProductsTypes.EDIT_PRODUCT,
    payload: product,
  };
};

export const AddProduct = (product) => {
  return {
    type: ProductsTypes.ADD_PRODUCT,
    payload: product,
  };
};

export const PutProductList = (productList) => {
  return {
    type: ProductsTypes.PUT_PRODUCT_LIST,
    payload: productList,
  };
};

export const GetAllProdsFromDB = () => (dispatch) => {
  GetProductHandler().then((response) => {
    const prods = [];
    response.forEach((res) => {
      return prods.push({ id: res.id, ...res.data() });
    });
    dispatch(PutProductList(prods));
  });
};
