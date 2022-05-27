import React, { useState,useEffect } from 'react'
import './PokeCardStyle.css'
import axios from 'axios';

const typeColours = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C'
}

export default function PokeCard({pokemon}) {
  const [isLoading, setLoading] = useState(true);
  const [pokeData, setPokeData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    axios.get(pokemon, {signal:controller.signal}).then(res => {
    setPokeData(res.data);
    setLoading(false);
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  })

  return () => {
    controller.abort();
  }
    
  }, [])

  if (isLoading) {
    return "Loading..."
  }
  
  return (
    <div className='card-container' style={{ background: "linear-gradient(45deg, #e66465, #9198e5)" }}>
      <h1>{pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1)}</h1>
      <div className="pokedex-num-container">
        <p>{"Pokedex: #" + pokeData.id}</p>
      </div>
      <div className="img-container">
        <img src={pokeData.sprites.front_default} alt="" />
      </div>
      <div className="height-weight-container">
        <p>{"Weight: " + (pokeData.weight * 0.1).toFixed(1) + "kg"}</p>
        <p>{"Height: " + (pokeData.height * 0.1).toFixed(1)  + "m"}</p>
      </div>
      <div className="type-container">
        {pokeData.types.map(slot => <p>{slot.type.name.charAt(0).toUpperCase() + slot.type.name.slice(1)}</p>)}
      </div>
    </div>
  
  )
}
