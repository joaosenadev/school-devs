import "./signIn.css"
import { useContext, useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Logo } from "../../components/Layout/Logo";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../contexts/appContext";
import { Loading } from "../../components/Layout/Loading";


export default function SignIn() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signIn, loadingAuth, signed } = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (signed) {
            navigate("/")
        }
    }, [signed]);

    async function handleLogin(e) {
        e.preventDefault()

        if (email !== "" && password !== "") {
            await signIn(email, password)
        }
        else {
            toast.error("Preencha todos os campos!")
        }
    }

    return (
        <div className="login-container">
            <section className="school-info">
                <Logo isShort={false} />
            </section>

            <Form className="d-grid form" onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                    <FloatingLabel label="Email">
                        <Form.Control type="email" placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                    <FloatingLabel label="Senha">
                        <Form.Control type="password" placeholder="Senha"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Button size="lg" variant="primary" className="btn" type="submit">
                    {loadingAuth ? (
                        <Loading size={40} color="#fff" />
                    ) : "Acessar"}
                </Button>

                <span>É professor e não possui conta? <Link to="/register">Faça seu cadastro</Link></span>
            </Form>
        </div>
    )
}
