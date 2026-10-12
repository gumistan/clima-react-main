import { useState } from "react"
import { useFetch } from "./hooks/useFetch";
import BusquedaCiudad from "./components/BusquedaCiudad"
import ListaCiudades from "./components/ListaCiudades"
import Pronostico from "./components/Pronostico"
import './App.css'

function App() {
  const [texto, setTexto] = useState("");
  const [ciudad, setCiudad] = useState(null);

  const activa = texto.length >= 3;


  const urlCiudades = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(texto)}&count=5&language=es`;
  const urlPronostico = ciudad
    ? `https://api.open-meteo.com/v1/forecast?latitude=${ciudad.latitude}&longitude=${ciudad.longitude}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
    : null;

  const ciudades = useFetch(activa ? urlCiudades : null);
  const clima = useFetch(urlPronostico);




  return (
    <div className="app">
      <h1>Clima</h1>
      <BusquedaCiudad texto={texto} onCambiar={setTexto} />
      {activa && (
        <ListaCiudades ciudades={ciudades} ciudad={ciudad} onCiudad={setCiudad} />
      )}
      {ciudad && (
        <Pronostico ciudad={ciudad} clima={clima} />
      )}



    </div>
  )
}

export default App
