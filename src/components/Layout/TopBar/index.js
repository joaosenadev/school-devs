import "./topBar.css"
import { Link, useLocation } from "react-router-dom"
import { Button, Nav, Navbar } from "react-bootstrap"
import { Logo } from "../Logo"

// Icons
import { FiHome, FiSettings, FiUserPlus, FiUserX, FiUsers, FiMenu } from "react-icons/fi"
import { IoMdClose } from "react-icons/io"

// Hooks
import { useState } from "react"
import { useMediaQueries } from "../../../hooks/useMediaQuery"

export function TopBar() {

    const { smallMax } = useMediaQueries()
    const [menu, setMenu] = useState(false)

    // Rotas
    const path = useLocation().pathname

    const home = "/"
    const alunos = "/alunos"
    const cadastrarAluno = "/cadastrar-aluno"
    const alunosDesativados = "/alunos-desativados"
    const settings = "/settings"

    const routes = [home, alunos, cadastrarAluno, settings, alunosDesativados]

    if (!routes.includes(path)) {
        return
    }

    const routesStyles = {
        home: path === home ? "nav-btn active" : "nav-btn",
        alunos: path === alunos ? "nav-btn active" : "nav-btn",
        cadastrarAluno: path === cadastrarAluno ? "nav-btn active" : "nav-btn",
        alunosDesativados: path === alunosDesativados ? "nav-btn active" : "nav-btn",
        settings: path === settings ? "nav-btn active" : "nav-btn",
    }


    return (
        <div className="topbar-container" style={{ height: "100px" }}>
            <Navbar className="navbar" data-bs-theme="dark" >
                <Navbar.Brand className="navbrand" style={smallMax ? { marginLeft: "-10px" } : { marginLeft: "-50px" }}>
                    <Link to={home}>
                        <Logo isShort={smallMax ? true : false} />
                    </Link>
                </Navbar.Brand>


                <Button onClick={() => setMenu(!menu)} className="menu-btn" variant="dark">
                    {menu ? <IoMdClose size={25} /> : <FiMenu size={25} />}
                </Button>

                {menu &&
                    <Nav variant="pills" className={`nav-top ${menu ? "showMenu" : "closeMenu"}`}>
                        <section className="nav-links" style={smallMax ? { width: "100%" } : { width: "60%" }}>
                            <Link className={routesStyles.home} to={home}>
                                <FiHome size={25} />
                                <span>Dashboard</span>
                            </Link>

                            <Link className={routesStyles.alunos} to={alunos}>
                                <FiUsers size={25} />
                                <span>Alunos</span>
                            </Link>

                            <Link className={routesStyles.cadastrarAluno} to={cadastrarAluno}>
                                <FiUserPlus size={25} />
                                <span>Cadastrar Aluno</span>
                            </Link>

                            <Link className={routesStyles.alunosDesativados} to={alunosDesativados}>
                                <FiUserX size={25} />
                                <span>Alunos desativados</span>
                            </Link>

                            <Link className={routesStyles.settings} to={settings}>
                                <FiSettings size={25} />
                                <span>Configurações</span>
                            </Link>
                        </section>
                        <div onClick={() => setMenu(!menu)}></div>
                    </Nav>}
            </Navbar>
        </div>
    )
}
