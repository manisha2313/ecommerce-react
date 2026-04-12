import { Outlet } from "react-router-dom";

function AuthLayout() {
    return (
        <div style={{ padding: "40px " }}>
            <Outlet />
        </div>
    )
}

export default AuthLayout;