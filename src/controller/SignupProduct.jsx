import axios from "axios";

export default async function SignupProduct(tittle, description, price, test) {
    if (test){
        await axios.post("https://ecommerce-af59.onrender.com/products", {tittle, description, price});
        window.alert("Produto cadastrado com sucesso");
        return "";
    } else{
        window.alert("Corrija todos os erros");
    }
}