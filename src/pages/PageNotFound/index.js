import { Button } from "react-bootstrap"
import "./pageNotFound.css"
import { FaRobot } from "react-icons/fa"
import { Link } from "react-router-dom"

export default function PageNotFound() {
    return (
        <div className="pageNotFound">
            <FaRobot size={100} />
            <h1>Página Não Encontrada.</h1>
            <Link to="/">
                <Button variant="outline-primary" size="lg">
                    Voltar para a Dashboard
                </Button>
            </Link>
        </div>
    )
}
