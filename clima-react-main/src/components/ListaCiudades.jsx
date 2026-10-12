export default function ListaCiudades({ ciudades, ciudad, onCiudad }) {

    if (ciudades.cargando) return <p className="mensaje">Buscando...</p>
    if (ciudades.error) return <p className="mensaje-error">Error: {ciudades.error}</p>
    if (!ciudades.datos) return null;

    const ciudadesLista = ciudades.datos.results ?? [];

    if (ciudadesLista.length === 0) return <p className="mensaje">Sin resultados</p>;

    return (
        <ul className="ciudades">
            {ciudadesLista.map((c) => (
                <li key={c.id} className={ciudad?.id === c.id ? "seleccionado" : ""} onClick={() => onCiudad(c)}>
                    {c.name}, {c.admin1}, {c.country}
                </li>
            ))}
        </ul>
    );
}