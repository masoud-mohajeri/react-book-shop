import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProdCard from '../../Components/prodCard/ProdCard';
import styles from './prods.styles.module.scss';
import { GetAllProdsFromDB } from '../../Redux/products/products.actions';
import { addToShCard } from '../../Redux/shcard/shCard.actions';

//
const mapState = (state) => ({
  products: state.products.products,
  shCard: state.card,
});

function Products() {
  const { products, shCard } = useSelector(mapState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllProdsFromDB());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCardHandler = (prod) => {
    if (shCard.bookIdArray.some((book) => book.id === prod.id)) {
      // console.log('add to card ', prod);
    } else {
      dispatch(addToShCard(prod));
    }
  };

  const seeDetailHandler = (id) => {
    // console.log('info page', id);
  };

  return (
    <React.Fragment>
      <h2 className={styles.title}>لیست کتاب ها</h2>
      <div className={styles.container}>
        {products.map((prod) => {
          return (
            <ProdCard
              key={prod.id}
              addtoCard={addToCardHandler}
              seeDetail={seeDetailHandler}
              info={prod}
            ></ProdCard>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default Products;
