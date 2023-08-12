import { useContext } from "react";
import { Button } from "react-bootstrap";
import { Title } from "../../components/Layout/Title";
import { AppContext } from "../../contexts/appContext";
import { Content } from "../../components/Layout/Content";


export default function Settings() {

  const { logout } = useContext(AppContext)

  return (
    <Content className="settings-container">
      <Title name="Configurações" />

      <Button variant="danger" onClick={logout}>
        Sair
      </Button>
    </Content>
  )
}
