import { useMediaQueries } from "../../../hooks/useMediaQuery"
import "./title.css"

export function Title({ name }) {

  const { smallMax } = useMediaQueries()

  return (
    <div className="title-container">
      <h1 style={smallMax ? {fontSize: "1.5rem"} : {fontSize: "2rem"}} className="title">{name}</h1>
    </div>
  )
}
