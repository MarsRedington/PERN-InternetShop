import React from 'react';
import { useState } from 'react';
import { createBrand } from '../../http/deviceAPI';

import './CreateElem.css'

const CreateBrand = () => {
    
    const [value, setValue] = useState('')

    const addBrand = () => {
        createBrand({name: value}).then(data => setValue(''))
    }
    

    return (
        <div className='formBrand'>
            <h3>Добавить бренд</h3>
            <form> 
                <input
                    className='inputElem'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder={'введите название бренда'}
                />  
                <button className='btnElem' onClick={addBrand}>Добавить</button>
            </form>

                
        </div>
    );
};

export default CreateBrand;