import { useMemo } from "react";


export default function Resumen({ semanal }) {
    const resumen = useMemo(() => {
        console.log("calculando resumen");
        const max = semanal.temperature_2m_max;
        const min = semanal.temperature_2m_min;

        const maxima = Math.max(...max);
        const minima = Math.min(...min);
        const fecha = semanal.time[max.indexOf(maxima)];

        return { maxima, minima, fecha };

    }, [semanal]);

    return (
        <p className="resumen">
            Esta semana: máxima {resumen.maxima} °C, mínima {resumen.minima} °C. El día más caluroso es el {resumen.fecha}.
        </p>
    );
}