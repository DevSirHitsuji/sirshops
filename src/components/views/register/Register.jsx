import { useEffect, useState } from "react"
import Signup from "../../../controller/Signup";
import { Link } from "react-router-dom";
import "./Register.css"

export default function Register(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errorPass, setErrorPass] = useState("");

    
    const [mainError, setMainError] = useState("");
    const [test, setTest] = useState(true);

    useEffect(() => {
        setName(firstName + " " + lastName)
    }, [firstName, lastName]);

    useEffect(() => {
        if (!firstName | !lastName | !email | !password | !password2){
            setMainError("Prencha todos os dados ")
            setTest(false);
            return;
        }else {
            setMainError("")
            setTest(true);
        }
        if (password != password2){
            setErrorPass("Senhas não coincidentes");
            setTest(false);
            return;
        }else{
            setErrorPass("")
            setTest(true);
            
        }
    })


    return (
        <div className="main">
        <header>
            <h1 className="logo font-effect-emboss">SirShops</h1> 
        </header>
         
        <form>
            <label htmlFor="firstName">Nome: </label>
            <input placeholder="Digite seu nome" name="firtsName" type="text" onChange={(e) => setFirstName(e.target.value)}/>

            <label htmlFor="lastName">Sobrenome: </label>
            <input placeholder="Digite seu sobrenome" name="lastName" type="text" onChange={(e) => setLastName(e.target.value)}/>

            <label htmlFor="email">Email: </label>
            <input placeholder="Digite seu email" name="email" type="text" onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="pass">Senha: </label>
            <input placeholder="Digite sua senha" name="pass" type="text" onChange={(e) => setPassword(e.target.value)}/>

            <label htmlFor="pass2">Confirmar senha:  </label>
            <input placeholder="Confirme sua senha" name="pass2" type="text"onChange={(e) => setPassword2(e.target.value)}/>
            <p className="error">{errorPass}</p>
            <p className="error">{mainError}</p>

            <button 
            type="button" 
            onClick={() => {                  
                    Signup(name, email, password, test);
                }
            }    
            >cadastrar</button>
            <Link className="link" to="/">Já está cadastrado? faça o login</Link>
        </form>
    </div>
    )
}