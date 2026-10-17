import { useState } from "react"
import { useFetch } from "./hooks/useFetch";
import { useDebounce } from "./hooks/useDebounce";
import BusquedaCiudad from "./components/BusquedaCiudad"
import ListaCiudades from "./components/ListaCiudades"
import Pronostico from "./components/Pronostico"
import './App.css'

function App() {
  const [texto, setTexto] = useState("");
  const [ciudad, setCiudad] = useState(null);
  const textoRetrasado = useDebounce(texto, 400);

  const activa = textoRetrasado.length >= 3;


  const urlCiudades = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(textoRetrasado)}&count=5&language=es`;
  const urlPronostico = ciudad
    ? `https://api.open-meteo.com/v1/forecast?latitude=${ciudad.latitude}&longitude=${ciudad.longitude}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
    : null;

  const ciudades = useFetch(activa ? urlCiudades : null);
  const clima = useFetch(urlPronostico);
  

  const cambiarTexto = (textoNuevo) => {
    setTexto(textoNuevo);
    setCiudad(null);
  };


  return (
    <div className="app">
      <h1>Clima</h1>
      <BusquedaCiudad texto={texto} onCambiar={cambiarTexto} onLimpiar={() => {
        setTexto("");
        setCiudad(null);
      }} />
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
