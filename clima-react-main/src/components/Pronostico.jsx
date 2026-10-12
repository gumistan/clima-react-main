import { describirClima, nombreDia } from "../clima";


export default function Pronostico({ ciudad, clima }) {

    if (clima.cargando) return <p className="mensaje">Cargando...</p>
    if (clima.error) return <p className="mensaje-error">Error: {clima.error}</p>
    if (!clima.datos) return null;

    const pronosticoActual = clima.datos.current;
    const pronosticoSemanal = clima.datos.daily;

    return (
        <section className="pronostico">
            <h2>{ciudad.name}</h2>
            <p className="actual">
                <span className="temperatura">{pronosticoActual.temperature_2m} °C</span>
                <span> · {describirClima(pronosticoActual.weather_code)} · viento {pronosticoActual.wind_speed_10m} km/h </span>
            </p>

            <div className="semanal">
                {pronosticoSemanal.time.map((fecha, i) => {
                    const icono = describirClima(pronosticoSemanal.weather_code[i]).split(" ")[0];
                    const min = Math.round(pronosticoSemanal.temperature_2m_min[i]);
                    const max = Math.round(pronosticoSemanal.temperature_2m_max[i]);

                    return (
                        <div className="dia" key={fecha}>
                            <p>{nombreDia(fecha)}</p>
                            <p>{icono}</p>
                            <p>{min}-{max}</p>
                        </div>
                    );
                }
                )}
            </div>
        </section>
    );
}