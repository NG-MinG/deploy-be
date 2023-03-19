import React, { useRef } from 'react';
import classes from './Home.module.css';
import { useNavigate } from 'react-router';

const Home = () => {
  const formRef = useRef();
  const { localStorage } = global.window;
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.setItem('role', formRef.current.role.value);
    if (formRef.current.role.value === 'user') {
      navigate('/customer/my-order');
    } else {
      navigate('/qr');
    }
  }

  return (
    <form type='POST' ref={formRef} className={classes.home}>
      <div className={classes.home__item}>
        <input type="radio" id='user' name='role' value='user' />
        <label for='user'>Customer</label>
      </div>
      <div className={classes.home__item}>
        <input type="radio" id='delivery' name='role' value='deliver' />
        <label for='delivery'>Deliver</label>
      </div>
      <button onClick={handleClick} type='submit' className={classes.home__btn}>Xác nhận</button>
    </form>
  );
};

export default Home;
