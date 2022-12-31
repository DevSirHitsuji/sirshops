export default function Authentication(email, password, dataUsers) {  
    const hasUser = [];

    dataUsers.forEach((user) => {
        if (user.email === email) {
            hasUser.push(user);
        }
    });

    if (hasUser?.length) {
        if (hasUser[0].email === email && hasUser[0].password === password) {
            localStorage.setItem("id", hasUser[0].id)
            localStorage.setItem("name", hasUser[0].name)
            localStorage.setItem("email", hasUser[0].email)
            return;
        }
        return "Senha incorreta.";
    }
    return "Usuário não encontrado."
}