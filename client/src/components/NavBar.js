import React, {useContext} from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import {observer} from 'mobx-react-lite'
import { Context } from '..';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { useHistory } from 'react-router-dom';

import './NavBar.css'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
            user.setUser({})
            user.setIsAuth(false)
            localStorage.removeItem('token')
            history.push(SHOP_ROUTE)
    }

    return (
        <Navbar className='navbar'>
                <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>КупиЧеНить</NavLink>
                {user.isAuth ?
                            <Nav className="ml-auto" style={{color: 'white'}}>
                                    <Button variant={'outline-light'} onClick={() => {history.push(ADMIN_ROUTE)}}>Админ панель</Button>
                                    <Button variant={'outline-light'} onClick={() => logOut()} className='ml-3'>Выйти</Button>
                            </Nav>
                            :
                            <Nav className="ml-auto" style={{color: 'white'}}>
                                    <Button variant={'outline-light'} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                            </Nav>
                }    
        </Navbar>
    );
});

export default NavBar;