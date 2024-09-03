import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import './index.css'

import {fetchCryptos} from './utils/api'
const App =() =>{
  const [cryptos, setCryptos] = useState([])
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const fetchCryptoData = async () => {
      const data = await fetchCryptos();
      setCryptos(data);
      console.log(cryptos);
    }
    fetchCryptoData();
    
  }, [])

  const toggleFavorite = (cryptoId) => {
    let updateFavorites;
    if(favorites.includes(cryptoId)){
      updateFavorites = favorites.filter(id => id !== cryptoId)
    }else{
      updateFavorites = [...favorites, cryptoId]
    }
    setFavorites(updateFavorites);
  }
  
  return (
    <>
      <Router>
        <div className='app'>
          <Navbar />
          <h1>Tableau de bord des cryptomonnaies</h1>
          <Routes>
            <Route path='/' element={<Home cryptos={cryptos} toggleFavorite={toggleFavorite} favorites={favorites}/>} />
            <Route path='/favorites' element={<Home />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
