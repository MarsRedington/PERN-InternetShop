import React from 'react';
import {observer} from 'mobx-react-lite'
import {Col} from 'react-bootstrap'
import BrandBar from '../components/BrandBar';
import TypeBar from '../components/TypeBar'
import DeviceList from '../components/DeviceList';
import Pages from '../components/Pages';
import { useContext } from 'react';
import { Context } from '..';
import { useEffect } from 'react';
import { fetchTypes, fetchBrands, fetchDevices } from '../http/deviceAPI';

import './Shop.css'

const Shop = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 5).then(data => {
            device.setDevice(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 5 ).then(data => {
            device.setDevice(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand])

    return (
        <div>
            <div className='brandlist'>
                <BrandBar/>
            </div>
            <div className='shopPage'>
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <DeviceList/>
                    <Pages/>
                 </Col>
             </div>
        </div>
    );
});

export default Shop;