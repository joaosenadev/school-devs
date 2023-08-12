import { Arrow } from "./assets/arrow"
import "./logo.css"

export function Logo({ dark, isShort }) {
    return (
        <div className="logo">
            <Arrow />
            {!isShort &&
                <>
                    <h1 style={{ color: dark ? "var(--dark-gray)" : "#fff" }}>School</h1>
                    <h2>Devs.</h2>
                </>
            }
            <Arrow />
        </div>
    )
}