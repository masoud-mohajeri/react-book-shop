import { Button, CardActions } from '@material-ui/core';
import React from 'react';
import styles from './ProdCard.styles.module.scss';

// Material
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Card,
} from '@material-ui/core';

function ProdCard(props) {
  // addtoCard , seeDetail , info

  const addToCardHandler = () => {
    props.addtoCard(props.info);
  };

  // const detailPageHandler = () => {
  //   props.seeDetail(props.info.id);
  // };

  return (
    <React.Fragment>
      <Card className={styles.card}>
        <CardActionArea>
          <CardMedia
            component='img'
            height='340'
            image={props.info.imageUrl}
            title='Contemplative Reptile'
          />
          <CardContent>
            {/* <Typography gutterBottom variant='h5' component='h4'> */}
            <h2>{props.info.name}</h2>
            {/* </Typography> */}
            <Typography variant='body2' color='textSecondary' component='p'>
              {props.info.price} <small>تومان</small>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            className={styles.cardButton}
            variant='contained'
            onClick={addToCardHandler}
            size='small'
            color='primary'
            disabled={props.info.Inventory === 0}
          >
            افزودن به سبد خرید
          </Button>
          {/* <Button onClick={detailPageHandler} size='small' color='primary'>
            مشاهده جزئیات
          </Button> */}
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

export default ProdCard;
