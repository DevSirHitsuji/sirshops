import axios from "axios";

export default async function SignupProduct(tittle, description, price, test) {
    const apiUrlBase = "https://ecommerce-af59.onrender.com"
    if (test){
        await axios.post(apiUrlBase + "/products", {tittle, description, price});
        window.alert("Produto cadastrado com sucesso");
        return "";
    } else{
        window.alert("Corrija todos os erros");
    }
}