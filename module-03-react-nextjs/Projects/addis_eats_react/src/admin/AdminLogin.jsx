import { useState } from "react";
import {useNavigate} from "react-router-dom"
import useAdminAuth from "./useAdminAuth";
function AdminLogin() {
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const {login} = useAdminAuth();
    const navigate= useNavigate();

    function handleSbmit(event) {
        event.preventDefault();


        if (username ==="Birhanu" && password === "admin123") {
            login();
            navigate("/admin");
            return
        }
         setError("Invalid admin username or password")   
    }
    return(
        <div className="admin-login-page">
            <h1>Admin Login</h1>
            
            <form onSubmit={handleSbmit}>
                <div className="form-field">
                    <label htmlFor="username">Username</label>
                    <input 
                    type="text" 
                    id="username"
                    value={username}
                    onChange={(event) =>setUsername(event.target.value)} /> 
                </div>

                <div className="form-field">
                    <label htmlFor="password">Password</label>
                    <input 
                    type="text" id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)} />
                </div>
                {error &&(
                    <p className="form-error">{error}</p>
                )}
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
} 
export default AdminLogin;