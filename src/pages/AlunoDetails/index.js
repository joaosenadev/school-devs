import React from 'react'
import { Content } from "../../components/Layout/Content"
import { Title } from "../../components/Layout/Title"
import { useParams } from 'react-router-dom'

export default function AlunoDetails() {

  const { id } = useParams()

  return (
    <Content className="details-container">
      <Title name="Detalhes do aluno" />

      <h1>Detalhes</h1>
      <h3>Matricula: {id}</h3>
    </Content>
  )
}
