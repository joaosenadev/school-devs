import "./students.css"
import { Title } from "../../components/Layout/Title"
import { Button, Form, Table } from "react-bootstrap"
import { Content } from "../../components/Layout/Content"

// Icons 
import { FiSearch, FiTrash } from "react-icons/fi"
import { useEffect } from "react"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"
import { useState } from "react"

const listRef = collection(db, "alunos")

export default function Students() {

  const [alunos, setAlunos] = useState([])

  useEffect(() => {
    async function loadAlunos() {
      const q = query(listRef, where("status", "==", "Ativo"), orderBy("matricula", "asc"))

      const querySnapshot = await getDocs(q)
      const alunosData = querySnapshot.docs.map((doc) => doc.data())
      setAlunos(alunosData)
    }

    loadAlunos()
  }, []);

  return (
    <Content className="alunos-container">
      <Title name="Alunos" />

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
          {alunos.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.matricula}</td>
              <td className="actions">
                <Button variant="danger">
                  <FiTrash size={20} />
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
