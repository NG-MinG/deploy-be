import React from 'react';
import classes from './layout.module.css';
import { Outlet } from 'react-router-dom';
import { faBars, faTruckFast, faClockRotateLeft, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BaseLayout = () => {

  return (
    <>
      <div className={classes.navbar}>
        <a href="#" className={classes.navbar__item}>
          <FontAwesomeIcon icon={faBars} />
          <span>Menu</span>
        </a>
        <a href="/shipments" className={classes.navbar__item}>
          <FontAwesomeIcon icon={faTruckFast} />
          <span>Giao hàng</span>
        </a>
        <div style={{marginLeft: "auto", marginRight: "auto"}}></div>
        <a href="/qr" className={classes.navbar__item}>
          <button className={classes.qrcode_btn}>
            <FontAwesomeIcon icon={faQrcode} />
          </button>
        </a>
        <a href="/customer/orders" className={classes.navbar__item}>
          <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_27_214)">
          <path d="M0 1.375C0 0.614453 0.595833 0 1.33333 0H4.37083C5.51667 0 6.5375 0.75625 6.9 1.88203L10.7375 13.75C11.9917 13.7715 13.1042 14.3902 13.8208 15.3398L22.2417 12.4438C22.9417 12.2031 23.6958 12.5941 23.9292 13.3117C24.1625 14.0293 23.7833 14.8113 23.0875 15.052L14.6667 17.948C14.6292 20.191 12.8542 22 10.6667 22C8.45833 22 6.66667 20.1523 6.66667 17.875C6.66667 16.5516 7.27083 15.3742 8.20833 14.618L4.37083 2.75H1.33333C0.595833 2.75 0 2.13555 0 1.375ZM10.2 5.7793C9.97083 5.05742 10.3542 4.27969 11.0542 4.04766L12.9583 3.41172L13.7833 6.02852L16.3208 5.17773L15.4917 2.56094L17.3958 1.925C18.0958 1.68867 18.85 2.08398 19.075 2.80586L21.1333 9.3457C21.3625 10.0676 20.9792 10.8453 20.2792 11.0773L13.9375 13.2C13.2375 13.4363 12.4833 13.041 12.2583 12.3191L10.2 5.7793Z" fill="white"/>
          </g>
          <defs>
          <clipPath id="clip0_27_214">
          <rect width="24" height="22" fill="white"/>
          </clipPath>
          </defs>
          </svg>
          <span>Kiểm tra</span>
        </a>
        <a href="#" className={classes.navbar__item}>
          <FontAwesomeIcon icon={faClockRotateLeft} />
          <span>Lịch sử</span>
        </a>
      </div>
      <Outlet />
    </>
  );
};


export default BaseLayout;
