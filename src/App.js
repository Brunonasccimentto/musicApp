import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Header from './components/header';
import Biblioteca from './pages/biblioteca';
import Login from './pages/login';
import Register from './pages/register';
import { useState, useEffect } from 'react';
import Container from './components/container';
import Artist from './pages/artist';

function App() {

  const [user, setUser] = useState("")
  const [hash, setHash ] = useState(false)

    useEffect(()=>{
        if(localStorage.getItem("token")){
            
           setHash(true)
           let current = localStorage.getItem("user")
           setUser(current)
           
        }    
    }, [])

  return (
    <div className="App">
    
      <Router>
        <div className='App-container'>
      <Header itens={["Home", "Biblioteca" , "Login"]} user={user}></Header>
              
          <Routes>
            <Route path='/*' element={<Container hash={hash}/>} />         
            <Route path='/biblioteca' element={<Biblioteca/>}/> 
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/> 
            <Route path='/artist' element={<Artist/>}/>
          </Routes>

        </div>
  
      </Router>
    </div>
  );
}

export default App;
