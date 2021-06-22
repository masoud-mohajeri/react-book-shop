import React from 'react';
import styles from './PostOrder.styles.module.scss';
import { useState } from 'react';
import { Button, div, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { useDispatch } from 'react-redux';
import { declareError } from '../../Redux/Errors/errors.actions';

function PostOrder(props) {
  const [postalCode, setPostalCode] = useState('');
  const [sent, setSent] = useState(false);
  const dispatch = useDispatch();

  const ButtonSendHandler = () => {
    if (postalCode) {
      props.sendHandler(props.info.id, postalCode);
      setSent(true);
    } else {
      dispatch(
        declareError({
          body: 'کد رهگیری پستی را وارد کنید ',
          title: '',
          spinner: false,
          dismiss: true,
        })
      );
    }
    // console.log(props.info.id);
  };

  const postalcodeHandler = (event) => {
    setPostalCode(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Paper elevation={3}>
        <div className={styles.body}>
          <section className={styles.info}>
            <div> آدرس تحویل : {props.info.ownerAddress}</div>
            <div>
              {props.info.bookIdArray.map((book, index) => (
                <section key={index} className={styles.books}>
                  <div> کتاب" {book.name}"</div>
                  <div> به تعداد" {book.count}"</div>
                </section>
              ))}
            </div>
          </section>
          {props.info.status === 'paied' &&
          !sent &&
          props.status === 'admin' ? (
            <section className={styles.form}>
              <div className={styles.dispIB}>
                <TextField
                  onChange={postalcodeHandler}
                  label='رهگیری پستی '
                  variant='outlined'
                />
              </div>
              <div className={styles.dispIB}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={ButtonSendHandler}
                >
                  ارسال
                </Button>
              </div>
            </section>
          ) : props.info.status === 'sent' &&
            !sent &&
            props.status === 'admin' ? (
            <h4> ارسال شده </h4>
          ) : props.status !== 'admin' ? (
            <div>
              {props.info.status === 'paied' ? (
                <h3>در حال پردازش انبار </h3>
              ) : props.info.status === 'sent' ? (
                <div>
                  <h3>ارسال شده</h3>
                  <h4> کد پیگیری پستی : {props.info.postalCode}</h4>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </Paper>
    </div>
  );
}

export default PostOrder;
