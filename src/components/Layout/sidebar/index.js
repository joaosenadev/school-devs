import { Button, Nav, Navbar } from "react-bootstrap"
import { Logo } from "../Logo"
import "./sidebar.css"

// Icons
import { FiHome, FiSettings, FiUserPlus, FiUserX, FiUsers } from "react-icons/fi"
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs"
import { Link, useLocation } from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "../../../contexts/appContext"

export function SideBar() {

    const { sidebarWidth, sidebar_large, sidebar_short, setSidebarDisplay, setSidebarWidth, routes, routesPath } = useContext(AppContext)

    // Rotas
    const path = useLocation().pathname

    if (!routesPath.includes(path)) {
        return
    }

    const routesStyles = {
        home: path === routes.home ? "nav-btn active" : "nav-btn",
        alunos: path === routes.alunos ? "nav-btn active" : "nav-btn",
        cadastrarAluno: path === routes.cadastrarAluno ? "nav-btn active" : "nav-btn",
        alunosDesativados: path === routes.alunosDesativados ? "nav-btn active" : "nav-btn",
        settings: path === routes.settings ? "nav-btn active" : "nav-btn",
        details: path === routes.details ? "nav-btn active" : "nav-btn",
    }

    // Tamanho da sidebar
    const handleIncreaseWidth = () => {
        sidebarWidth < sidebar_large ? setSidebarWidth(sidebar_large) : setSidebarWidth(sidebar_short)
    }


    return (
        <div className="sidebar-container" style={{ width: `${sidebarWidth}px` }}>
            <Navbar className="navbar" data-bs-theme="dark" >
                <Navbar.Brand className="navbrand">
                    <Link to={routes.home}>
                        <Logo isShort={sidebarWidth === sidebar_large ? false : true} />
                    </Link>
                </Navbar.Brand>


                <Nav variant="pills" className="nav flex-column">
                    <section className={`nav-links ${setSidebarDisplay}`}>
                        <Link className={routesStyles.home} to={routes.home}>
                            <FiHome size={25} />
                            <span>Dashboard</span>
                        </Link>

                        <Link className={routesStyles.alunos} to={routes.alunos}>
                            <FiUsers size={25} />
                            <span>Alunos</span>
                        </Link>

                        <Link className={routesStyles.cadastrarAluno} to={routes.cadastrarAluno}>
                            <FiUserPlus size={25} />
                            <span>Cadastrar Aluno</span>
                        </Link>

                        <Link className={routesStyles.alunosDesativados} to={routes.alunosDesativados}>
                            <FiUserX size={25} />
                            <span>Alunos desativados</span>
                        </Link>
                    </section>

                    <section className={`nav-settings ${setSidebarDisplay}`}>
                        <Button className="toggle-nav-btn" onClick={handleIncreaseWidth} variant="primary">
                            {sidebarWidth === sidebar_large ? <BsArrowBarLeft size={20} /> : <BsArrowBarRight size={20} />}
                        </Button>
                        <Link className={routesStyles.settings} to={routes.settings}>
                            <FiSettings size={25} />
                            <span>Configurações</span>
                        </Link>
                    </section>
                </Nav>

            </Navbar>
        </div>
    )
}
