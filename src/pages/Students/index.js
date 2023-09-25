import "./students.css"
import { Title } from "../../components/Layout/Title"
import { Button, Form, OverlayTrigger, Table, Tooltip } from "react-bootstrap"
import { Content } from "../../components/Layout/Content"

// Icons 
import { FiSearch } from "react-icons/fi"
import { useEffect } from "react"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const listRef = collection(db, "alunos")

export default function Students() {

  const [alunos, setAlunos] = useState([])
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([])

  useEffect(() => {
    const termoSearch = search.toLowerCase()
    const resultsSearch = alunos.filter((aluno) => (
      aluno.matricula.toLowerCase().includes(termoSearch) ||
      aluno.name.toLowerCase().includes(termoSearch))
    )
    setResults(resultsSearch)
  }, [search]);

  // Carregar alunos
  useEffect(() => {
    async function loadAlunos() {
      const q = query(listRef, where("status", "==", "Ativo"), orderBy("matricula", "asc"))

      const querySnapshot = await getDocs(q)
      const alunosData = querySnapshot.docs.map((doc) => doc.data())
      setAlunos(alunosData)
    }

    loadAlunos()
  }, []);


  const ButtonTip = ({ title, id, children, to }) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
      <Link to={to}>
        <Button>{children}</Button>
      </Link>
    </OverlayTrigger>
  )

  return (
    <Content className="alunos-container">
      <Title name="Alunos" />

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
          {search.length === 0 ? alunos.map((item, index) => (
            <tr key={index}>
              <td data-label="Nome">{item.name}</td>
              <td data-label="Matrícula">{item.matricula}</td>
              <td className="actions">
                <ButtonTip to={`/aluno/details/${item.matricula}`} id="students-details" title="Detalhes do Aluno">
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
                  <ButtonTip to={`/aluno/details/${item.matricula}`} id="students-details" title="Detalhes do Aluno">
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
