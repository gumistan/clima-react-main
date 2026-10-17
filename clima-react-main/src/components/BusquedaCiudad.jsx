import { useRef, useEffect } from "react";

export default function BusquedaCiudad({ texto, onCambiar, onLimpiar }) {

  const entrada = useRef(null);
  useEffect(() => {
    entrada.current.focus();
  }, []);

  function limpiar() {
    onLimpiar();
    entrada.current.focus();
  }

  return (
    <div className="buscador">
      <input ref={entrada}
        type="text"
        value={texto}
        onChange={(e) => onCambiar(e.target.value)}
        placeholder="Busca una ciudad..."
      />
      <button onClick={limpiar}>
        Limpiar
      </button>
    </div>
  );
}