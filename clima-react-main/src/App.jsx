import { useState, useEffect } from 'react'
import BusquedaCiudad from "./components/BusquedaCiudad"
import ListaCiudades from "./components/ListaCiudades"
import './App.css'

function App() {
  const [texto, setTexto] = useState("");
  const [ciudades, setCiudades] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (texto.length < 3) return;

    const control = new AbortController();

    async function buscar() {
      setCargando(true);
      setError(null);

      try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(texto)}&count=5&language=es`;
        const r = await fetch(url, { signal: control.signal });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const d = await r.json();
        setCiudades(d.results ?? []);
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        setCargando(false);
      }
    }

    buscar();
    return () => control.abort();
  }, [texto]);

  const activa = texto.length >= 3;


  return (
    <div className="app">
      <h1>Clima</h1>
      <BusquedaCiudad texto={texto} onCambiar={setTexto} />
      {activa && cargando && <p className="mensaje">Buscando...</p>}
      {activa && error && <p className="mensaje-error">Error: {error}</p>}
      {activa && !cargando && !error && ciudades && (
        <ListaCiudades ciudades={ciudades} />
      )}

    </div>
  )
}

export default App
