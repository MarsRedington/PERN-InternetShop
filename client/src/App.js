import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import {observer} from 'mobx-react-lite'
import { useContext } from 'react';
import { Context } from '.';
import { useState } from 'react';
import { useEffect } from 'react';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';

import './App.css'
import Footer from './components/Footer';

const App = observer( () => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      user.setUser(true)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  if(loading){
    return <Spinner animation={'grow'}/>
  }

  return (
    <BrowserRouter>
      <NavBar />
      <main>
       <AppRouter /> 
      </main>
        
      <Footer/>
    </BrowserRouter>
  );
})

export default App;
