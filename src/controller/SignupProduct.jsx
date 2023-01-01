import axios from "axios";

export default async function SignupProduct(tittle, description, price, test) {
    const apiUrlBase = "http://localhost:3000"
    if (test){
        await axios.post(apiUrlBase + "/products", {tittle, description, price});
        window.alert("Produto cadastrado com sucesso");
        return "";
    } else{
        window.alert("Corrija todos os erros");
    }
}