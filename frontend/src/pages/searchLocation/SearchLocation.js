import React, { useEffect, useRef, useState } from 'react';
import classes from './SearchLocation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SearchLocation = ({textSearch, setCoor, setTextSearch, submitOrder}) => {

  const handleClickSearch = async (e) => {
    e.preventDefault();
    // const data = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${textSearch}&key=4ab525058be84e86831d79366777fd57`);
  
    // if (data.data.results.length) {
    //   setCoor(data.data.results[0].geometry)
    // }
    // console.log(coor);
    const data = await axios.get(`http://localhost:5000/api/v1/locate?address=${textSearch}`);
    setCoor(data.data.geometry);
  }

  const [address_l, setAddress] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/locate')
    .then(res => {
      setAddress(res.data.geometry.data);
    })
    .catch(err => console.log(err));
   
  }, []);

  return (
    <div className={classes.searchLocation}>
      <form onSubmit={handleClickSearch} className={classes.searchLocation__search}>
        <Autocomplete
          style={{width: '100%'}}
          freeSolo
          onChange={(event, value) => setTextSearch(value)}
          id="free-solo-2-demo"
          options={address_l.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              style={{width: '100%'}}
              label="Search input"
              InputProps={{
                ...params.InputProps,
                type: 'text',
              }}
            />
          )}
        />
        {/* <input onChange={(e) => setTextSearch(e.target.value)} 
          className={classes['searchLocation__search-input']} 
        placeholder='Nhập địa chỉ...' /> */}
        <button type='submit' className={classes['searchLocation__search-icon']} >
        <FontAwesomeIcon 
        icon={faSearch} />
        </button>
        <button type='button' onClick={submitOrder} className={classes.finish_btn}>Finish</button>
      </form>
    </div>
  );
}

export default SearchLocation;
