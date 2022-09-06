import './App.css';
import {BrowserRouter as Router, Routes, Route, link} from "react-router-dom"
import Header from './components/header';
import Logo from './components/logo';
import Home from './pages/home';
import Biblioteca from './pages/biblioteca';
import Login from './pages/login';
import Album from './pages/album';
import { Provider } from 'react-redux';
import albumReducer from './components/albumreducer';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from "redux-thunk"
import Find from './components/search';

function App() {

  const store = createStore(albumReducer, applyMiddleware(thunk))

  return (
    <div className="App">
    <Provider store={store}>
      <Router>
      <Header itens={["Home", "Biblioteca" , "Login"]}></Header>
      
        <Routes>
          <Route path='/*' element={<Home/>}/> 
          <Route path='/album' element={<Album/>}/>
          <Route path='/biblioteca' element={<Biblioteca/>}/> 
          <Route path='/login' element={<Login/>}/> 
        </Routes>
      
      </Router>
    </Provider>
      

    </div>
  );
}

export default App;
