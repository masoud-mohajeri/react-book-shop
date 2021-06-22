import React, { useState } from 'react';
import styles from './BookEditor.styles.module.scss';
import AddProdForm from '../addProdForm/AddProdForm';

// Material
import { Button } from '@material-ui/core';

import { ExpandLess, ExpandMore } from '@material-ui/icons';

function BookEditor(props) {
  const [open, setOpen] = useState(false);
  const editMenuHandler = () => {
    setOpen(!open);
  };

  return (
    <section className={styles.container}>
      <section className={styles.vitrin}>
        <img
          className={styles.image}
          src={props.initialValues.imageUrl}
          alt='img of prod'
        />
        <div className={styles.name}>
          <small>نام کتاب </small> <h4>{props.initialValues.name}</h4>
        </div>
        <div className={styles.info}>
          <small>موجودی </small> <h4>{props.initialValues.Inventory}</h4>
        </div>
        <div className={styles.info}>
          <Button onClick={editMenuHandler}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </Button>
        </div>
      </section>
      {open ? (
        <section className={styles.editMenu}>
          <div>
            <AddProdForm
              initialValues={props.initialValues}
              submitHelper={props.editProdSubmit}
              redButton={{
                type: 'edit',
                action: props.deleteProdHandler,
              }}
            ></AddProdForm>
          </div>
        </section>
      ) : null}
    </section>
  );
}

export default BookEditor;
