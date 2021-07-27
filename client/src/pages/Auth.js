import React from 'react';
import {useHistory} from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { useState } from 'react';
import {observer} from 'mobx-react-lite'
import { useContext } from 'react';
import { Context } from '..';

import './Auth.css'

const Auth = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

 const Registration = async () => {
        try {
            let data = await registration(email, password) 
            user.setUser(true)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
        } catch (error) {
            alert(error.response.data.message)
        }
        
    }  
    
    const Login = async () => {
        try {
            let data = await login(email, password)
            user.setUser(true)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
        } catch (error) {
            alert(error.response.data.message)
        }
        
    }

    return (

	<div className="section">
		<div className="container">
			<div className="row full-height justify-content-center">
				<div className="col-12 text-center align-self-center py-5">
					<div className="section pb-5 pt-5 pt-sm-2 text-center">
						<h6 className="mb-0 pb-3"><span>Войти</span><span>Зарегистрироваться</span></h6>
			          	<input 
                          className="checkbox" 
                          type="checkbox" 
                          id="reg-log" 
                          name="reg-log"
                        />
			          	<label htmlFor="reg-log"></label>
						<div className="card-3d-wrap mx-auto">
							<div className="card-3d-wrapper">
								<div className="card-front">
									<div className="center-wrap">
										<div className="section text-center">
											<h4 className="mb-4 pb-3">Войти</h4>
											<div className="form-group">
												<input 
                                                    type="email" 
                                                    name="logemail" 
                                                    className="form-style" 
                                                    placeholder="Ваш Email" 
                                                    id="logemail" 
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                />
												<i className="input-icon uil uil-at"></i>
											</div>	
											<div className="form-group mt-2">
												<input 
                                                    type="password" 
                                                    name="logpass" 
                                                    className="form-style" 
                                                    placeholder="Ваш пароль" 
                                                    id="logpass" 
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}

                                                />
												<i className="input-icon uil uil-lock-alt"></i>
											</div>
											<button className="btn_auth mt-4"  onClick={Login}>Войти</button>
				      					</div>
			      					</div>
			      				</div>
								<div className="card-back">
									<div className="center-wrap">
										<div className="section text-center">
											<h4 className="mb-4 pb-3">Зарегистрироваться</h4>
											<div className="form-group mt-2">
												<input 
                                                    type="email" 
                                                    name="logemail" 
                                                    className="form-style" 
                                                    placeholder="Your Email" 
                                                    id="logemail" 
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                />
												<i className="input-icon uil uil-at"></i>
											</div>	
											<div className="form-group mt-2">
												<input 
                                                    type="password" 
                                                    name="logpass" 
                                                    className="form-style" 
                                                    placeholder="Your Password" 
                                                    id="logpass" 
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                />
												<i className="input-icon uil uil-lock-alt"></i>
											</div>
											<button className="btn_auth mt-4"  onClick={Registration}>Зарегистрироваться</button>
				      					</div>
			      					</div>
			      				</div>
			      			</div>
			      		</div>
			      	</div>
		      	</div>
	      	</div>
	    </div>

            
        </div>
    );

});

export default Auth;