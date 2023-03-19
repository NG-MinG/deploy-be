import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import classes from './OrderChecking.module.css';
import io from 'socket.io-client';

const socket = io.connect('https://busl-be.onrender.com/api/v1');

const OrderChecking = () => {
  const [data, setData] = useState();
  const path = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://busl-be.onrender.com/api/v1/orders/${path.pathname.split('/')[3]}`)
      console.log(res.data.data);
      setData(res.data.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    socket.on('status', (data) => {
      setData(data);
    });
  }, []);

  return (
    <div className={classes.orderChecking}>
      <div className={classes.orderCheckingContent}>
        <h3>Thông tin đơn hàng</h3>
        <div className={classes.orderCheckingContent__product}>
          <img width='80px' src="https://healthvietnam.vn/photos/shares/Mypham/hairburst-for-longer-stronger-hair.jpg" alt="" />
          <ul>
            <strong>{data?.product[0].name}</strong>
            <li>Số lượng: {data?.product[0]?.amount}</li>
            <li>{data?.product[0]?.price}đ</li>
          </ul>
        </div>
        <div className={classes.orderCheckingContent__bill}>
          <div className={classes['orderCheckingContent__bill--item']}>
            <strong>Thành tiền</strong>
            <strong>{data?.product[0]?.amount * data?.product[0]?.price}vnd</strong>
          </div>
          <div className={classes['orderCheckingContent__bill--item']}>
            <p>Thời gian đặt hàng</p>
            <p>10-03-2023 12:35 PM</p>
          </div>
        </div>
        <h4 style={{marginBottom: '0'}}>Trạng thái đơn hàng</h4>
        <p style={{margin: '4px 0', color: 'orange', fontSize: '15px'}}>Đang vận chuyển</p>
        <p style={{color: '#226B2E', fontSize: '14px'}}>Dự kiến đến trạm Hàm Nghi vào 13TH 03 2023</p>

        <ul className={classes.orderCheckingContent__position}>
          {data?.path.map((e, idx) => (
            <li className={classes['orderCheckingContent__position--item']}>
            <p>Đơn hàng đã đến trạm {e?.end}</p>
            {/* <strong>13 Th3 2023</strong> */}
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OrderChecking;
