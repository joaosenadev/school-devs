import "./register.css"
import { useContext, useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Logo } from "../../components/Layout/Logo";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../contexts/appContext";
import { Loading } from "../../components/Layout/Loading";

export default function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signUp, loadingAuth, signed } = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (signed) {
            navigate("/")
        }
    }, [signed]);

    async function handleRegister(e) {
        e.preventDefault()

        if (email !== "" && password !== "" && name !== "") {
            await signUp(name, email, password)
        }
        else {
            toast.error("Preencha todos os campos!")
        }
    }

    return (
        <div className="register-container">
            <section className="school-info">
                <Logo isShort={false} />
            </section>

            <Form className="d-grid form" onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                    <FloatingLabel label="Nome">
                        <Form.Control type="text" placeholder="Nome"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                    <FloatingLabel label="Email">
                        <Form.Control type="email" placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                    <FloatingLabel label="Senha">
                        <Form.Control type="password" placeholder="Senha"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Button size="lg" variant="primary" className="btn" type="submit">
                    {loadingAuth ? (
                        <Loading size={40} color="#fff" />
                    ) : "Registrar"}
                </Button>

                <span>Já possui uma conta? <Link to="/login">Faça Login</Link></span>
            </Form>
        </div>
    )
}
