import { Fragment ,React, useEffect, useState } from "react";
import { Routes ,Route, BrowserRouter} from "react-router-dom";

import Main from "./components/views/main/Main";
import { Login } from "./components/views/login/Login";
import axios from "axios";
import Register from "./components/views/register/Register";
import AddProduct from "./components/views/addProduct/AddProduct";


export default function Routers(props) {
    const apiUrlBase = "https://ecommerce-af59.onrender.com"
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [carts, setCarts] = useState([]);

    localStorage.setItem("signed", false);
    
    async function getUsers() {
        const data = await axios.get(apiUrlBase + "/users");
        setUsers(data.data);
    }
    
    async function getProducts(){
        const data = await axios.get(apiUrlBase + "/products");
        setProducts(data.data);
    }

    async function getCarts(){
        const data = await axios.get(apiUrlBase + "/carts");
        setCarts(data.data);
    }
   
    useEffect(() => getProducts, []);
    useEffect(() => getUsers, []);
    useEffect(() => getCarts, []);

    const Private = (props) => {
        const resp = localStorage.getItem("signed");
        const signed = resp === "true" ? true : false; 
        
        return signed ? props.Item : <Login />;
    }

    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route exact path="/home" element={<Private Item={<Main products={products} carts={carts} /> } />} />
                    <Route path="/product" element={<Private Item={<AddProduct /> } />}/>
                    <Route path="/" element={<Login users={users} />} />
                    <Route exact path="/register" element={<Register users={users} />}/>
                    <Route path="*" element={<Login users={users} />}/>
                </Routes>
            </Fragment>           
        </BrowserRouter>
    )
}