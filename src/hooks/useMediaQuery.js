import { useState, useMemo, useEffect } from "react";

// Função de saber quando o tamanho da página foi alterada...
export function useMediaQuery(query) {
    const mediaQuery = useMemo(() => window.matchMedia(query), [query])
    const [match, setMatch] = useState(mediaQuery.matches)

    useEffect(() => {
        const onChange = () => setMatch(mediaQuery.matches)
        mediaQuery.addEventListener("change", onChange)

        return () => mediaQuery.removeEventListener("change", onChange)
    }, [mediaQuery]);

    return match
}

// Tamanhos das Páginas...
export function useMediaQueries() {
    
    // Min
    const smallMin = useMediaQuery("(min-width: 600px)")
    const mediumMin = useMediaQuery("(min-width: 768px)")
    const largeMin = useMediaQuery("(min-width: 992px)")
    const extraLargeMin = useMediaQuery("(min-width: 1200px)")

    // Max
    const verySmallMax = useMediaQuery("(max-width: 300px)")
    const smallMax = useMediaQuery("(max-width: 600px)")
    const largeMax = useMediaQuery("(max-width: 992px)")
    
    return {
        smallMax,
        smallMin,
        mediumMin,
        largeMin,
        largeMax,
        extraLargeMin,
    }
}
