import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import classes from './orderList.module.css';

const OrderList = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`https://busl-be.onrender.com/api/v1/orders?idUser=US202`);
      setData(data.data.data);
    }
    fetchData();
  }, []);

  return (
    <div className={classes.orderList}>
      <h3>Đơn hàng của tôi</h3>
      <div className={classes.orderList__list}>
        {data?.length && data.map((e, idx) => (
          <div className={classes['orderList__list--item']}
            onClick={() => navigate(`/customer/checking/${e?._id}`)}
          >
          <img width='80px' src={e?.product[0]?.img || "https://healthvietnam.vn/photos/shares/Mypham/hairburst-for-longer-stronger-hair.jpg"} alt="" />
          <ul>
            <strong>{e?.product[0]?.name}</strong>
            <li>Số lượng: {e?.product[0]?.amount}</li>
            <li>{e?.product[0]?.price}đ</li>
          </ul>
        </div>
        ))}
      </div>
    </div>
  );
}

export default OrderList;
