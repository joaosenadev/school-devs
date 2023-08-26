import { Title } from "../../components/Layout/Title"
import { Button, Form, OverlayTrigger, Table, Tooltip } from "react-bootstrap"
import { Content } from "../../components/Layout/Content"

// Icons
import { FiSearch } from "react-icons/fi"
import { AiOutlineReload } from "react-icons/ai"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../services/firebaseConnection"

const listRef = collection(db, "alunos")

export default function AlunosInativos() {

    const [alunosDesativados, setAlunosDesativados] = useState([])
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])

    useEffect(() => {
        const termoSearch = search.toLowerCase()
        const resultsSearch = alunosDesativados.filter((aluno) => (
            aluno.matricula.toLowerCase().includes(termoSearch) ||
            aluno.name.toLowerCase().includes(termoSearch))
        )
        setResults(resultsSearch)
    }, [search]);


    // Carregar Alunos desativados/inativos
    useEffect(() => {
        async function loadAlunosDesativados() {
            const q = query(listRef, where("status", "==", "Inativo"), orderBy("matricula", "asc"))

            const querySnapshot = await getDocs(q)
            const alunosDataDesativados = querySnapshot.docs.map((doc) => doc.data())
            setAlunosDesativados(alunosDataDesativados)
        }

        loadAlunosDesativados()
    }, []);


    const ButtonTip = ({ title, id, children }) => (
        <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
            <Button>{children}</Button>
        </OverlayTrigger>
    )

    return (

        <Content className="alunos-container">
            <Title name="Alunos Desativados" />

            <Form className="search-alunos" onSubmit={(e) => e.preventDefault()}>
                <Form.Label>Buscar Aluno</Form.Label>
                <div>
                    <Form.Control
                        placeholder="Digite o nome ou matrícula do aluno..."
                        id="inputSearch"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </Form>

            <Table striped hover border="collapse" className="table-alunos">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Matrícula</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {search.length === 0 ? alunosDesativados.map((item, index) => (
                        <tr key={index}>
                            <td data-label="Nome">{item.name}</td>
                            <td data-label="Matrícula">{item.matricula}</td>
                            <td className="actions">
                                <ButtonTip id="students-details" title="Detalhes do Aluno">
                                    <FiSearch size={20} />
                                </ButtonTip>
                            </td>
                        </tr>
                    )) : (
                        results.length > 0 ? results.map((item, index) => (
                            <tr key={index}>
                                <td data-label="Nome">{item.name}</td>
                                <td data-label="Matrícula">{item.matricula}</td>
                                <td className="actions">
                                    <ButtonTip id="students-details" title="Detalhes do Aluno">
                                        <FiSearch size={20} />
                                    </ButtonTip>
                                </td>
                            </tr>
                        )) : (
                            <span className="no-results">Sem Resultados...</span>
                        )
                    )}

                </tbody>
            </Table>

        </Content>
    )
}
