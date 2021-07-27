import React, {useContext} from 'react';
import { useState } from 'react';
import { Button, Form, Dropdown} from 'react-bootstrap'
import { useEffect } from 'react';
import { createDevice, fetchTypes, fetchBrands, fetchDevices } from '../../http/deviceAPI';
import { Context } from '../../index';
import {observer} from 'mobx-react-lite'

import './CreateElem.css'


const CreateDevice = observer(() => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [imgUrl, setImgUrl] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices().then(data => device.setDevice(data.rows))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map( i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {

        setFile(e.target.files[0])
        setImgUrl(URL.createObjectURL(e.target.files[0]))
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price',`${price}`)
        formData.append('img', file)
        formData.append('typeId', device.selectedType.id)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('info', JSON.stringify(info))

        createDevice(formData).then(()=>{
            alert('Товар добавлен')
            setName('')
            setPrice(0)
            setFile(null)
            setImgUrl(null)
        })
    }

    return (
        <div className='formElem'>
            <h3>Создать новый элемент</h3>
             <Form>
                 <div className='wrapper'>

                 
                    <div className='wrapper_col'>
                        <p> Выберите тип товара</p>
                        <Dropdown className='mt-2 mb-2'>
                            <Dropdown.Toggle className='selectForm'>{ device.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
                            <Dropdown.Menu className='selectForm' style={{width: '200px;'}}>
                                {device.types.map(type =>
                                    <Dropdown.Item className='selectForm' onClick={() => device.setSelectedType(type)} key={type.id}>{type.name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <p> Выберите бренд товара</p>
                        <Dropdown>
                            <Dropdown.Toggle className='selectForm'>{ device.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
                            <Dropdown.Menu className='selectForm'>
                                {device.brands.map(brand =>
                                    <Dropdown.Item className='selectForm' onClick={() => device.setSelectedBrand(brand)} key={brand.id}>{brand.name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='wrapper_col'>
                        <p> Введите название товара (Модель)</p>
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className='inputElem'
                            placeholder='Введите название устройства'
                        
                            />
                            <p> Введите цену товара</p>
                        <input
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
                            className='inputElem'
                            placeholder='Введите стоимость устройства'
                            />
                    </div>
                </div>
                <hr/>
                <div className='wrapper'>
                <div className='wrapper_col'>
                    <img className='imgDevice' src={imgUrl} alt='Выберите изображение'/>
                </div>
                <div className='wrapper_col'>
                    <input 
                        className='inputElem'
                        type='file'
                        onChange={selectFile}
                    />
                </div>
                </div>
                    
                    <hr/>
                    
                        <Button className='inputElem' onClick={addInfo}> Добавить новое свойство</Button>
                        {info.map(i =>
                                <div className='colNewProp'>
                                            <input
                                                className='inputElem'
                                                value={i.title}
                                                onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                                placeholder='Введите название свойства'
                                            />
                                            <input
                                                className='inputElem'
                                                value={i.description}
                                                onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                                placeholder='Введите описание свойства'
                                            />  
                                     <Button variant={'outline-danger'} onClick={() => removeInfo(i.number)}>Удалить</Button>
                                </div>
                                    
                            
                        )}
                    
                </Form>
                <hr/>
                <button className='btnElem d ml-auto' onClick={addDevice}>Добавить</button> 
                
        </div>
    );
});

export default CreateDevice;