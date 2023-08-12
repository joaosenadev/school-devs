import { Routes, Route } from "react-router-dom";
import { useMediaQueries } from "../hooks/useMediaQuery";

import Private from "./Private";

// Components
import { SideBar } from "../components/Layout/sidebar";
import { TopBar } from "../components/Layout/TopBar";

// Pages
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import PageNotFound from "../pages/PageNotFound";
import Settings from "../pages/Settings";
import Students from "../pages/Students";
import CadastroAluno from "../pages/CadastroAluno";
import AlunosInativos from "../pages/AlunosInativos";

export default function RoutesApp() {
    const { largeMax, largeMin } = useMediaQueries()

    return (
        <>
            {largeMax && <TopBar />}
            {largeMin && <SideBar />}
            <Routes>
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />

                <Route path="/" element={<Private><Dashboard /></Private>} />
                <Route path="/alunos" element={<Private><Students /></Private>} />
                <Route path="/cadastrar-aluno" element={<Private><CadastroAluno /></Private>} />
                <Route path="/alunos-desativados" element={<Private><AlunosInativos /></Private>} />
                <Route path="/settings" element={<Private><Settings /></Private>} />

                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    )
}