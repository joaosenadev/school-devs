import { Routes, Route } from "react-router-dom";
import { useMediaQueries } from "../hooks/useMediaQuery";

import Private from "./Private";

// Components
import { SideBar } from "../components/Layout/sidebar";
import { TopBar } from "../components/Layout/TopBar";

// Pages
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import Dashboard from "../Pages/Dashboard";
import PageNotFound from "../Pages/PageNotFound";
import Settings from "../Pages/Settings";
import Students from "../Pages/Students";
import CadastroAluno from "../Pages/CadastroAluno";
import AlunosInativos from "../Pages/AlunosInativos";

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