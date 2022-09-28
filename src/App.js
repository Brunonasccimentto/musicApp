import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Header from './components/header';
import Biblioteca from './pages/biblioteca';
import Login from './pages/login';
import Footer from './components/footer';
import Register from './pages/register';
import { useState, useEffect } from 'react';
import Container from './components/container';
import Artist from './pages/artist';

function App() {

  const [music, setMusic] = useState()
  const [player, setPlayer] = useState()
  const [user, setUser] = useState("")
  const [hash, setHash ] = useState(false)

    useEffect(()=>{
        if(localStorage.getItem("token")){
            
           setHash(true)
           let current = localStorage.getItem("user")
           setUser(current)
           
        }    
    }, [])
  
  function ActiveMusic(e){

    let currentMusic = e.target.parentElement.offsetParent.children[0].children[1].children[0].innerText
    setMusic(currentMusic)

    let currentPlayer = e.target.parentElement.parentElement.children[1].currentSrc
}

  return (
    <div className="App">
    
      <Router>
        <div className='App-container'>
      <Header itens={["Home", "Biblioteca" , "Login"]} user={user}></Header>
      
        
          <Routes>
            <Route path='/*' element={<Container ActiveMusic={ActiveMusic} hash={hash}/>} />         
            <Route path='/biblioteca' element={<Biblioteca/>}/> 
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/> 
            <Route path='/artist' element={<Artist/>}/>
          </Routes>
        
      

        </div>
        <Footer music={music} player={player}/>
      
      </Router>
    
      

    </div>
  );
}

export default App;
