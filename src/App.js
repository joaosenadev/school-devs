import RoutesApp from "./Routes/routes";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AppProvider from "./contexts/appContext";

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <ToastContainer autoClose={3000} theme="colored" />
        <RoutesApp />
      </AppProvider>
    </BrowserRouter>
  );
}