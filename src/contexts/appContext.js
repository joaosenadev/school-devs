import { createContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebaseConnection"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AppContext = createContext({})

export default function AppProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    // Keys Local Storage
    const LOCAL_STORAGE_KEY = "@schoolDevs"
    const LOCAL_STORAGE_SIDEBAR = "@schoolDevs_Sidebar"

    // Sidebar
    const sidebar_large = 300
    const sidebar_short = 100
    const savedSidebarWidth = localStorage.getItem(LOCAL_STORAGE_SIDEBAR)
    const [sidebarWidth, setSidebarWidth] = useState(savedSidebarWidth ? Number(savedSidebarWidth) : sidebar_large)
    const setSidebarDisplay = sidebarWidth === sidebar_large ? "onDisplay" : "offDisplay"

    // Content Styles
    const contentSideBar = {
        marginLeft: sidebarWidth,
        padding: "25px 30px",
        transition: ".3s",
    }
    const contentTopBar = {
        marginTop: 100,
        padding: "25px 30px",
        transition: ".3s",
    }

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_SIDEBAR, sidebarWidth)
    }, [sidebarWidth]);



    // Load User
    useEffect(() => {
        async function loadUser() {

            const storageUser = localStorage.getItem(LOCAL_STORAGE_KEY)

            if (storageUser) {
                setUser(JSON.parse(storageUser))
                setLoading(true)
            }
            setLoading(false)
        }
        loadUser()

    }, []);


    // Logar usuario

    async function signIn(email, password) {
        setLoadingAuth(true)

        await signInWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                const uid = value.user.uid

                const docRef = doc(db, "professores", uid)
                const docSnap = await getDoc(docRef)

                let data = {
                    uid: uid,
                    nome: docSnap.data().nome,
                    email: value.user.email,
                }

                setUser(data)
                setLoadingAuth(false)
                storageUser(data)
                toast.success("Bem-Vindo de volta professor :)")
                navigate("/")
            })
            .catch(() => {
                toast.error("Senha incorreta ou o usuário não existe!")
                setLoadingAuth(false)
            })
    }


    // Cadastrar Usuarios (Professores)

    async function signUp(name, email, password) {
        setLoadingAuth(true)

        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                const uid = value.user.uid

                await setDoc(doc(db, "professores", uid), {
                    name: name,
                    email: value.user.email
                })
                    .then(() => {
                        let data = {
                            uid: uid,
                            name: name,
                            email: value.user.email,
                        }

                        setUser(data)
                        setLoadingAuth(false)
                        storageUser(data)
                    })

                toast.success("Bem-Vindo professor :)")
                navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code

                switch (errorCode) {
                    case "auth/email-already-in-use":
                        toast.error("O E-mail já está sendo ultilizado!")
                        break
                    case "auth/weak-password":
                        toast.error("A senha deve obter no mínimo 6 caracteres!")
                        break
                    default:
                        toast.error("Erro ao fazer o login.")
                        break
                }
                setLoadingAuth(false)
            })
    }

    // Set User in LocalStorage
    function storageUser(user) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user))
    }

    // Logout User Function
    async function logout() {
        await signOut(auth)
        localStorage.removeItem(LOCAL_STORAGE_KEY)
        setUser(null)
    }

    return (
        <AppContext.Provider
            value={{
                signed: !!user,
                user,
                signIn,
                signUp,
                logout,
                loading,
                loadingAuth,
                storageUser,
                setUser,

                //Sidebar
                sidebarWidth,
                setSidebarWidth,
                sidebar_large,
                sidebar_short,
                setSidebarDisplay,

                contentSideBar,
                contentTopBar,
            }}
        >
            {children}
        </AppContext.Provider>
    )

}