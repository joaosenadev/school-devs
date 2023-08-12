import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../contexts/appContext";


export default function Private({ children }) {
    const { signed, loading } = useContext(AppContext)

    if(loading){
        return <div></div>
    }

    if (!signed) {
        return <Navigate to="/login" />
    }

    return children
}