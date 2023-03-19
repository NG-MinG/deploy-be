import React from 'react';
import image from '../../assets/imgs/anh1.jpg';
import classes from './MyOrder.module.css';

const MyOrder = () => {
  return (
    <div className={classes.myOrder}>
      <img width='100%' src={image} alt="" />
      <div className={classes.myOrder__btn}>
        <a href='/' style={{textDecoration: 'none'}} className={classes['myOrder__btn--cancel']}>Hủy</a>
        <a href='/shipments' style={{textDecoration: 'none'}} className={classes['myOrder__btn--next']}>Tiếp tục</a>
      </div>
    </div>
  );
}

export default MyOrder;
