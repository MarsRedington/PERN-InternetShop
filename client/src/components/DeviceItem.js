import React from 'react';
import { Col, Card, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import star from '../assets/star.png'
import { DEVICE_ROUTE } from '../utils/consts';

import './DeviceItem.css'

const DeviceItem = ({device}) => {
    const history = useHistory()
    return (
        <Col md={3} onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, height: 230, cursor: 'pointer', marginBottom: 20}} border={'light'}>
                <Image src={process.env.REACT_APP_API_URL + device.img} className='deviceItemImg'/>
                <div className='text-black-50 d-flex justify-content-between align-items-center'>
                    <div></div>
                    <div className='mt-1 d-flex align-items-center'>
                        <div>{device.rating}</div>
                        <Image src={star} width={18} height={18}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;