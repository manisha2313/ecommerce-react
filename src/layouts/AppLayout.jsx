import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function AppLayout() {
    return (
        <>
            <Navbar />
            <main style={{padding:"20px",marginTop: "56px"}}>
                <Outlet />
            </main>
        </>
    )
}

export default AppLayout;