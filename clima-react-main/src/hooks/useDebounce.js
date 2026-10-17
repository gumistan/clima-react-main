import { useState, useEffect } from "react"

export function useDebounce(texto, ms) {
    const [retrasado, setRetrasado] = useState(texto);

    useEffect(() => {
        const id = setTimeout(() => setRetrasado(texto), ms);
        return () => clearTimeout(id);

    }, [texto, ms]);

    return retrasado;
}