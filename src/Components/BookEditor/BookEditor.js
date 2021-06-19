import React, { useState } from 'react';
import styles from './BookEditor.styles.module.scss';
import AddProdForm from '../addProdForm/AddProdForm';

// Material
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { ExpandLess, ExpandMore } from '@material-ui/icons';

function BookEditor(props) {
  const [open, setOpen] = useState(false);
  const editMenuHandler = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.container}>
      <div className={styles.vitrin}>
        <Grid container>
          <Grid item xs={3}>
            <img
              className={styles.image}
              src={props.initialValues.imageUrl}
              alt='img of prod'
            />
          </Grid>
          <Grid item xs={3}>
            <h4> نام کتاب : {props.initialValues.name}</h4>
          </Grid>
          <Grid item xs={3}>
            <h4> موجودی : {props.initialValues.Inventory}</h4>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={editMenuHandler}>
              {open ? <ExpandLess /> : <ExpandMore />}
            </Button>
          </Grid>
        </Grid>
      </div>
      {open ? (
        <div className={styles.editMenu}>
          <Grid container>
            <Grid item xs={12}>
              <AddProdForm
                initialValues={props.initialValues}
                submitHelper={props.editProdSubmit}
                redButton={{
                  type: 'edit',
                  action: props.deleteProdHandler,
                }}
              ></AddProdForm>
            </Grid>
          </Grid>
        </div>
      ) : null}
    </div>
  );
}

export default BookEditor;
