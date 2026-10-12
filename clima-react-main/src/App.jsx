import { useState } from "react"
import { useFetch } from "./hooks/useFetch";
import BusquedaCiudad from "./components/BusquedaCiudad"
import ListaCiudades from "./components/ListaCiudades"
import './App.css'

function App() {
  const [texto, setTexto] = useState("");
  const activa = texto.length >= 3;
  const urlCiudades = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(texto)}&count=5&language=es`;

  const resultado = useFetch(activa ? urlCiudades : null);
  const ciudades = resultado.datos?.results ?? [];


  return (
    <div className="app">
      <h1>Clima</h1>
      <BusquedaCiudad texto={texto} onCambiar={setTexto} />
      {activa && resultado.cargando && <p className="mensaje">Buscando...</p>}
      {activa && resultado.error && <p className="mensaje-error">Error: {resultado.error}</p>}
      {activa && !resultado.cargando && !resultado.error && resultado.datos && (
        <ListaCiudades ciudades={ciudades} />
      )}

    </div>
  )
}

export default App
