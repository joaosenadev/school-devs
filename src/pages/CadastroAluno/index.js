import "./cadastroAluno.css"
import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { Title } from "../../components/Layout/Title"
import { Content } from "../../components/Layout/Content"

import User from "../../assets/user.png"

// Icons
import { FiPlus } from "react-icons/fi"

// Firebase
import { addDoc, collection } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"
import { toast } from "react-toastify"

export default function CadastroAluno() {

    const [name, setName] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [civilStatus, setCivilStatus] = useState("")
    const [gender, setGender] = useState("")
    const [status, setStatus] = useState("")
    //Address
    const [city, setCity] = useState("")
    const [state, setState] = useState("")


    // Registrar Aluno
    async function handleRegister(e) {
        e.preventDefault()

        // Matricula
        const matricula = dateOfBirth.replaceAll("-", "") + Math.floor(Math.random() * 9999)

        const allVariables = [name, dateOfBirth, civilStatus, gender, state, city, state]

        for (const variable of allVariables) {
            if (variable === "") {
                toast.info("Preencha todos os dados corretamente...")
                return
            }
        }

        await addDoc(collection(db, "alunos"), {
            name: name,
            dateOfBirth: dateOfBirth,
            civilStatus: civilStatus,
            gender: gender,
            city: city,
            state: state,
            status: status,
            matricula: matricula,
        })
            .then(() => {
                toast.success("Aluno registrado com sucesso! 😎")
            })
            .catch(() => {
                toast.error("Falha ao registrar o aluno! 😕")
            })
    }

    function handleChangeGender(selectedGender) {
        setGender(selectedGender)
    }

    function handleChangeStatus(selectedStatus) {
        setStatus(selectedStatus)
    }

    return (
        <Content className="cadastrarAlunos-container">
            <Title name="Cadastrar novo aluno" />

            <Form className="register-aluno" onSubmit={handleRegister}>
                <section className="register-aluno-form">
                    <Form.Group className="f-section f-border">
                        <span className="f-section-title">Dados pessoais</span>

                        <Col className="d-flex flex-column gap-2 mt-3 mb-2">

                            <Form.Group>
                                <Form.Label>Nome Completo</Form.Label>
                                <Form.Control
                                    placeholder="Digite o nome do aluno..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Estado Civil</Form.Label>
                                    <Form.Select value={civilStatus} onChange={(e) => setCivilStatus(e.target.value)}>
                                        <option value="" selected disabled>Selecione</option>
                                        <option value="Solteiro">Solteiro</option>
                                        <option value="Casado">Casado</option>
                                        <option value="Divorciado">Divorciado</option>
                                        <option value="Viúvo">Viúvo</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Data Nasc.</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                    />
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Sexo</Form.Label>
                                    <Form.Check
                                        label="Masculino"
                                        id="Masculino"
                                        name="gender"
                                        checked={gender === "Masculino"}
                                        type="radio"
                                        onChange={() => handleChangeGender("Masculino")}
                                    />
                                    <Form.Check
                                        label="Feminino"
                                        id="Feminino"
                                        name="gender"
                                        checked={gender === "Feminino"}
                                        type="radio"
                                        onChange={() => handleChangeGender("Feminino")}
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Check
                                        label="Ativo"
                                        id="Ativo"
                                        name="status"
                                        checked={status === "Ativo"}
                                        type="radio"
                                        onChange={() => handleChangeStatus("Ativo")}
                                    />
                                    <Form.Check
                                        label="Inativo"
                                        id="Inativo"
                                        name="status"
                                        checked={status === "Inativo"}
                                        type="radio"
                                        onChange={() => handleChangeStatus("Inativo")}
                                    />
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Cidade</Form.Label>
                                    <Form.Control
                                        placeholder="Cidade..."
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Control
                                        placeholder="Estado..."
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    />
                                </Form.Group>
                            </Row>

                            <Button className="mt-2 w-100" type="submit">
                                <FiPlus size={25} />
                                Cadastrar aluno
                            </Button>
                        </Col>
                    </Form.Group>

                    <section className="f-info f-border p-3 h-100">
                        <img className="user-img" src={User} alt="User" />

                        <Form.Group>
                            <Row>
                                <Col className="w-100 m-2">
                                    <Form.Label>Data da matrícula</Form.Label>
                                    <Form.Control
                                        type="text"
                                        disabled
                                        value="20/20/2020"
                                    />


                                    <Form.Label className="mt-2">Venci. da matrícula</Form.Label>
                                    <Form.Control className="mb-3"
                                        type="text"
                                        disabled
                                        value="20/20/2021"
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                    </section>
                </section>
            </Form>
        </Content>
    )
}
