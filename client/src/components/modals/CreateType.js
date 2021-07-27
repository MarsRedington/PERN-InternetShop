import React from 'react';
import { useState } from 'react';
import { createType } from '../../http/deviceAPI';

import './CreateElem.css'


const CreateType = () => {
    
    const [value, setValue] = useState('')

    const addType = () => {
        createType({name: value}).then(data => setValue(''))
    }
    
    return (
        <div className='formBrand'>
             <h3>Добавить тип</h3>
                <form cl>
                    <input
                    className='inputElem'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={'введите название типа'}
                    />
                   <button className='btnElem' onClick={addType}>Добавить</button> 
                </form>
                
        </div>
    );
};

export default CreateType;