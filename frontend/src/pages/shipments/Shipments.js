import React, { useState, useEffect } from 'react';
import SearchLocation from '../searchLocation/SearchLocation';
import classes from './Shipments.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './spinner.css';

const Shipments = () => {
    const langsrc = 105.87395, latsrc = 21.0449;
    const [coor, setCoor] = useState({lat: '', lng: ''});
    const [order_data, setOrderData] = useState(null);
    const [is_loading, setLoading] = useState(false);
    const [textSearch, setTextSearch] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (coor.lng && coor.lat) {
            setLoading(true);
            axios.post('https://busl-be.onrender.com/api/v1/shipments', { 
                params: {
                    start: `${langsrc}_${latsrc}`,
                    end: `${coor.lng}_${coor.lat}`
                }
            })
            .then(res => {
                const route = res.data;
                const route_arr = [];
                const arr_id = route.route_id.split('-');

                route.start.forEach((item, index) => { 
                    route_arr.push({
                        numRoute: arr_id[index],
                        start: item,
                        end: route.end[index],
                        numStation: route.station
                    });
                });
                setOrderData({map: route.map, route: route_arr});
                // setLoading(false);
            })
            .catch(err => console.log(err));
        }
    }, [coor]);

    const submitOrder = () => {
        if (textSearch.length <= 0 || !coor.lat || !coor.lng || !order_data) {
            alert('Vui lòng nhập địa chỉ giao hàng');
            return;
        }
        axios.post('https://busl-be.onrender.com/api/v1/order', {
            params:{
                start_address: '255 Đường Nguyễn Văn Cừ, Phường Ngọc Lâm, Quận Long Biên, Hà Nội',
                end_address: textSearch,
                path: order_data.route,
                idUser: 'US202',
                product: [{
                    name: "Dầu gọi ngăn gàu mát lạnh", 
                    price: "45000",
                    amount: 2
                }]
            }
        }).then(res => {
            navigate(`/customer/back`);
        }).catch(err => console.log(err));
      }

    return <div className={classes.map}>
        <SearchLocation setCoor={setCoor} setTextSearch={setTextSearch} textSearch={textSearch} submitOrder={submitOrder} />
        {is_loading && <div class="lds-default" style={{position: 'fixed', left: '48.9%', top: '49.9%', transform: 'translate(-50%, -100%)'}}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}

        <div className={classes.top__bar}></div>
        { !coor.lng || !coor.lat || !order_data ? <span><br /><br /><br /><br /><br /><br />KHÔNG TỒN TẠI ĐỊA CHỈ GIAO HÀNG</span> : <iframe title='mapbox' onLoad={() => setLoading(false)} src={order_data.map} className={classes.bus__map} /> }
    </div>
};

export default Shipments;