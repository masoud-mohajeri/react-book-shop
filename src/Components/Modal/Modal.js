import React from 'react';
import styles from './modeal.styles.module.scss';
import reactDom from 'react-dom';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { resolveError } from '../../Redux/Errors/errors.actions';
// Material
import { Button, CircularProgress } from '@material-ui/core';

const mapState = ({ error }) => {
  return {
    errorExists: error.errorExists,
    errorTitle: error.errorTitle,
    errorBody: error.errorBody,
    errorSpinner: error.errorSpinner,
    errorDismiss: error.errorDismiss,
  };
};

export function ModalBody(props) {
  const {
    errorExists,
    errorBody,
    errorSpinner,
    errorTitle,
    errorDismiss,
  } = useSelector(mapState);
  const dispatch = useDispatch();

  const modalDismisser = () => {
    dispatch(resolveError());
  };

  return (
    <React.Fragment>
      {errorExists ? (
        <div className={styles.modal}>
          <div className={styles.backDrop}>
            <div className={styles.info}>
              {errorTitle ? (
                <div className={styles.title}>
                  {' '}
                  <h2>{errorTitle}</h2>
                </div>
              ) : null}
              {errorBody ? (
                <div className={styles.body}>
                  {' '}
                  <h4>{errorBody}</h4>
                </div>
              ) : null}
              {errorSpinner ? (
                <div className={styles.spinner}>
                  <CircularProgress />
                </div>
              ) : null}
              {errorDismiss ? (
                <Button
                  onClick={modalDismisser}
                  color='secondary'
                  variant='outlined'
                >
                  باشه
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}

const Modal = (props) => {
  return (
    <React.Fragment>
      {reactDom.createPortal(
        <ModalBody />,
        document.getElementById('error-modal')
      )}
    </React.Fragment>
  );
};

export default Modal;
