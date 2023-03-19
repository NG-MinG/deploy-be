import axios from 'axios';
import React, {useEffect, useState, useRef} from 'react';
import classes from './QRChecking.module.css';
import QRCode from 'qrcode.react';

const QRChecking = () => {
  const { localStorage } = global.window;
  const [isOpen, setOpen] = useState(false);
  const [isOpenRoute, setOpenRoute] = useState(false);
  const [isOpenStation, setOpenStation] = useState(false);
  const [route, setRoute] = useState(0);
  const [station, setStation] = useState('');
  const [dataRoute, setDataRoute] = useState('');

  const [delivery, setData] = useState();

  useEffect(() => {
    const fetchStation = async () => {
      const data = await axios.get('http://127.0.0.1:5000/api/v1/stations');
      setDataRoute(data?.data?.data);
    }
    fetchStation();
  }, []);

  useEffect(() => {
    const fetchCheckin = async () => {
      const dt = await axios.get(`http://127.0.0.1:5000/api/v1/orders?numRoute=${dataRoute[route]?.id}&nameStation=${station}`);
      setData(dt.data.data);
    }
    fetchCheckin();
  }, [station, route]);

  return (
    <div className={classes.QRChecking}>
      {isOpen && <div className={classes.modal}>
        <div className={classes.modal__content}>
          <div className={classes['modal__content--route']}>
            <input type="text" value={dataRoute.length ? dataRoute[route].id : ''} onFocus={() => setOpenRoute(true)} placeholder='Chọn tuyến xe bus...' />
            {isOpenRoute && <ul className={classes['modal__content--route-list']}>
              {dataRoute.length && dataRoute.map((e, idx) => (
                <li
                  key={+idx}
                 onClick={() => {
                  setRoute(idx);
                  setOpenRoute(false);
                 }}>{e.id}</li>
              ))}
            </ul>}
          </div>
          <div className={classes['modal__content--station']}>
            <input type="text" value={station} onFocus={() => setOpenStation(true)} placeholder='Chọn trạm sắp đến...' />
            {isOpenStation && <ul className={classes['modal__content--station-list']}>
              {dataRoute[route]?.stations.map((e, idx) => (
                <li
                key={+idx}
                 onClick={() => {
                  setStation(e);
                  setOpenStation(false);
                 }}>{e}</li>
              ))}
            </ul>}
          </div>
          <div onClick={() => {
            setOpen(false);
          }} className={classes.modal__btn}>Xác nhận</div>
        </div>
      </div>}

      <h2 onClick={() => setOpen(true)}>MÃ QR</h2>
      <div className={classes.QRChecking__qr}>
        {localStorage?.role === 'user' ? <QRCode
          id='qrcode'
          value={`http://127.0.0.1:5000/api/v1/checking/US121`}
          size={190}
          level={'H'}
          includeMargin={true}
        />
        : <QRCode
          id='qrcode'
          value={`http://127.0.0.1:5000/api/v1/checking/delivery-check?data=${JSON.stringify(delivery)}`}
          size={190}
          level={'H'}
          includeMargin={true}
        />}
        <p>Đưa mã QR này vào máy quét</p>
      </div>
      <ul className={classes.QRChecking__info}>
        <li>
          <strong>Deliver</strong>
          <p>Trần Văn A</p>
        </li>
        <li>
          <strong>Biển số</strong>
          <p>52B-56483</p>
        </li>
        <li>
          <strong>Trạm</strong>
          <p>Nguyễn Văn Cừ</p>
        </li>
      </ul>
      {/* <ul className={classes.QRChecking__package}>
        <li>
          <strong>Số lượng gói hàng cần lấy</strong>
          <p style={{color: 'red'}}>{delivery?.length}</p>
        </li>
        <li>
          <strong>Số lượng gói hàng giao</strong>
          <p style={{color: 'red'}}>{localStorage.store && localStorage.store !== 'undefined' ? JSON.parse(localStorage.store).length : 0 }</p>
        </li>
      </ul> */}
    </div>
  );
}

export default QRChecking;
