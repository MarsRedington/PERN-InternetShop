import React from 'react';
import { useEffect, useContext } from 'react';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import CreateType from '../components/modals/CreateType';
import {Context} from '../index'
import { check } from '../http/userAPI';

import './Admin.css'
import '../components/modals/CreateElem.css'


const Admin = () => {
    const {user} = useContext(Context)
    // const [brandVisible, setBrandVisible] = useState(false)
    // const [typeVisible, setTypeVisible] = useState(false)
    // const [deviceVisible, setDeviceVisible] = useState(false)
    useEffect(() => {
        check().then(data => {
          user.setUser(true)
          user.setIsAuth(true)
        })
      }, [])
    return (
          <div>

            <div className='adminWrap'>
              <CreateBrand />
              <CreateType />
            </div>
            <div className='adminWrap'>
              <CreateDevice />
            </div>

        </div>
    );
};

export default Admin;