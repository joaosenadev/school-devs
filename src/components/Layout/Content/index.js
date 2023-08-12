import React, { useContext } from 'react'
import { AppContext } from '../../../contexts/appContext'
import { useMediaQueries } from '../../../hooks/useMediaQuery'

export function Content({ className, children }) {
    const { contentSideBar, contentTopBar } = useContext(AppContext)
    const { largeMin } = useMediaQueries()

    return (
        <section className={className} style={largeMin ? contentSideBar : contentTopBar}>
            {children}
        </section>
    )
}
