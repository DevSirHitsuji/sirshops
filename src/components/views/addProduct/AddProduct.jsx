import "./AddProduct.css";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import SignupProduct from "../../../controller/SignupProduct";

export default function addProduct(props) {
    const [tittle, setTittle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("")

    const [mainError, setMainError] = useState("");
    const [test, setTest] = useState();

    useEffect(() => {
        if (!tittle| !description | !price){
            setMainError("Prencha todos os dados ");
            setTest(false);
            return;
        }else {
            setMainError("");
            setTest(true);
            return;
        }
        
    })


    return (
        <div className="main">
        <header>
            <h1 className="logo font-effect-emboss">SirShops</h1> 
        </header>
         
        <form>
            <label htmlFor="title">Titulo </label>
            <input className="title" placeholder="Insira o titulo" name="tittle" type="text" onChange={(e) => setTittle(e.target.value)} maxLength={20}/>

            <label htmlFor="desc">Descrição </label>
            <input className="desc" placeholder="Insira a descrição" name="description" type="text" onChange={(e) => setDescription(e.target.value)}/>

            <label htmlFor="price" >Preço </label>
            <input className="price" placeholder="Defina seu preço" name="price" type="text" onChange={(e) => setPrice(e.target.value)}/>
            <p className="error">{mainError}</p>

            <button 
            type="button" 
            onClick={() => {                  
                    SignupProduct(tittle, description, parseFloat(price), test)
                }
            }    
            >cadastrar</button>
            
            <Link to="/home">voltar para a home</Link>
        </form>
    </div>
    )
}