export default function ListaCiudades({ ciudades }) {
    if(ciudades.length === 0) return <p className="mensaje">Sin resultados</p>;
    return (
        <ul class="ciudades">
            {ciudades.map((c) => (
                <li key={c.id}>
                    {c.name}, {c.admin1}, {c.country}
                </li>
            ))}
        </ul>
    );
}