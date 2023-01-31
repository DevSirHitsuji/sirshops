import { useEffect } from "react";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import Authentication from "../../../authentication/Authentication";

import "./Login.css"

export function Login(props) {

    const apiUrlBase = "https://ecommerce-af59.onrender.com"

    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [users, setUsers] = useState("");

    async function getUsers() {
        const data = await axios.get(apiUrlBase + "/users");
        setUsers(data.data);
    }

    useEffect(() => getUsers(), [])

    const handleLogin = async () => {
        if (!email | !password){
            setError("preencha todos os dados");
            return;
        }

        const response = Authentication(email, password, users);
        console.log(users)

        if (response){
            setError(response);
            return;
        }

        localStorage.setItem("signed", true);
        navigate("/home")
    };
    

    return (
        <div className="main">
            <header>
                <h1 className="logo font-effect-emboss">SirShops</h1> 
            </header>

            <form>
                <h2>LOGIN</h2>
                
                    <input name="email" placeholder="Digite seu e-mail" type="text" onChange={(e) => setEmail(e.target.value)}/>
                    <input name="pass" type="text" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)}/>
                
                <p className="error">{error}</p>

                <button type="button" onClick={handleLogin}>login</button>
                <Link className="link" to="/register">cadastre-se agora</Link>
            </form>        
        </div>
    )
}