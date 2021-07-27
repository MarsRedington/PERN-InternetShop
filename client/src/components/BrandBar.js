import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite'
import {Card} from 'react-bootstrap';
import { Context } from '..';

import './BrandBar.css'

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <div className='brandbar'>
        <>
            {device.brands.map(brand => 
                <Card
                className='brandBarItem'
                onClick={()=>device.setSelectedBrand(brand)}
                border={brand.id === device.selectedBrand.id ? 'light' : 'no'}
                key={brand.id} 
                >
                    {brand.name}
                </Card>
                )}
        </>
     </div>
    );
});

export default BrandBar;