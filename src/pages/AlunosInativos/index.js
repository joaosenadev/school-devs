import "./alunosInativos.css"
import { Title } from "../../components/Layout/Title"
import { Button, Form, Table } from "react-bootstrap"
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

    useEffect(() => {
        async function loadAlunosDesativados() {
            const q = query(listRef, where("status", "==", "Inativo"), orderBy("matricula", "asc"))

            const querySnapshot = await getDocs(q)
            const alunosDataDesativados = querySnapshot.docs.map((doc) => doc.data())
            setAlunosDesativados(alunosDataDesativados)
        }

        loadAlunosDesativados()
    }, []);

    return (

        <Content className="alunos-container">
            <Title name="Alunos Desativados" />

            <Form className="search-alunos" onSubmit={(e) => e.preventDefault()}>
                <Form.Label>Buscar Aluno</Form.Label>
                <div>
                    <Form.Control
                        placeholder="Digite o nome do aluno..."
                        id="inputSearch"
                    />
                    <Button>
                        <FiSearch size={25} />
                    </Button>
                </div>
            </Form>

            <Table striped hover border="collapse" className="table-alunos">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Matrícula</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {alunosDesativados.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.matricula}</td>
                            <td className="actions">
                                <Button variant="info">
                                    <AiOutlineReload size={20} />
                                </Button>
                                <Button>Details</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Content>
    )
}
