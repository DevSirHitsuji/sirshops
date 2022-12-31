import axios from "axios";

export default async function Signup(name, email, password, test, dataUsers) {
    dataUsers?.forEach((user) => {
        if (user.email === email) {
            return "Este email já está cadastrado"
        }
    });

    if (test){
        await axios.post("https://ecommerce-af59.onrender.com/users", {name, email, password});
        window.alert("Usuario cadastrado com sucesso");
        return "";
    } else{
        window.alert("Corrija todos os erros");
    }
}