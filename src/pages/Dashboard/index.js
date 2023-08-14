import "./dashboard.css"
import { Content } from "../../components/Layout/Content"
import { Title } from "../../components/Layout/Title"
import { useEffect, useState } from "react";
import { db } from "../../services/firebaseConnection";
import { collection, getDocs } from "firebase/firestore";

export default function Dashboard() {

  const [teachers, setTeachers] = useState(0)
  const [students, setStudents] = useState(0)

  useEffect(() => {
    async function loadData() {
      const teachersQuery = (await getDocs(collection(db, "professores"))).size
      const studentsQuery = (await getDocs(collection(db, "alunos"))).size
      setTeachers(teachersQuery)
      setStudents(studentsQuery)
    }

    loadData()
  }, []);


  return (
    <Content className="dashboard-container">
      <Title name="Dashboard" />

      <section className="dashboard-cape">
        <img src="https://blog.vindi.com.br/wp-content/uploads/2018/09/Gestao-escolar.jpg" alt="Dashboard Cape" />
      </section>

      {/* TEMPORARIO.... */}
      <div className="teste">
        <div className="dashboard-card alunos">
          <h1>{students}</h1>

          <span>Alunos</span>
        </div>

        <div className="dashboard-card professores">
          <h1>{teachers}</h1>

          <span>Professores</span>
        </div>
      </div>
    </Content>
  )
}
