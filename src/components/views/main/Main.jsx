import "./Main.css";
import axios from "axios";

import { Link } from "react-router-dom";
import perfilImg from "../../../assets/images/perfilDefault.png";
import productImg from "../../../assets/images/productDefault.jpg";
import addCart from "../../../assets/icons/addCart.svg";
import backIcon from "../../../assets/icons/backIcon.svg";
import menuIcon from "../../../assets/icons/menuIcon.svg";
import cancelIcon from "../../../assets/icons/cancel.svg"

import { useEffect, useState } from "react";

export default function Main(props) {
    const apiUrlBase = "http://localhost:3000"
    const [userProducts, setUserProducts] = useState([]);
    const [products, setProducts] = useState(props.products);

    function moreInfo() {
        let visible = document.getElementById("menu");
        const sheet = new CSSStyleSheet();

        if (visible.name == "visible"){
            updateProducts();
            visible.name = "invisible";
            sheet.replaceSync(".menu{display: none}");
            document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
            
        }else{
            visible.name = "visible"
            sheet.replaceSync(".menu{display: flex}");
            document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
        }     
    }

    async function littleCart() {
        let visible = document.getElementById("littleCart");
        const sheet = new CSSStyleSheet();

        if (visible.name == "visible"){
            visible.name = "invisible";
            sheet.replaceSync(".littleCart{display: none}");
            document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
            
            
        }else{

            visible.name = "visible"
            sheet.replaceSync(".littleCart{display: flex}");
            document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
        }     
    }

    const name = localStorage.getItem("name");

    const insertProduct = async (key) => {
        const user_id = localStorage.getItem("id");
        const product_id = key;
        const stats = "Bought";
        await axios.post(apiUrlBase + "/carts", {user_id, product_id, stats});
    }

    const updateProducts = async () => {
        const products = await axios.get(apiUrlBase + "/products");
        setProducts(products.data)
    }

    const updateCarts = async () => {
        const carts = await axios.get( apiUrlBase + "/carts");
        
    }

    return (
        <div className="mainScreen">
            <header>
                <h1 className="logo font-effect-emboss">SirShops</h1>
                <div className="btn" onClick={moreInfo} >
                    <p>{userProducts}</p>
                    <img className="perfil"  src={menuIcon} />
                </div>

                <div id="menu" name="invisible" className="menu">
                <div className="btn back" onClick={() => {moreInfo()}}>
                    <img src={backIcon}/>
                </div>
                <div className="flex">
                    <img className="perfil" src={perfilImg} />
                    <p>{name}</p>
                </div>
                
                <a onClick={littleCart}>Carrinho</a>
                <Link to="/product">Add produto</Link>
                <a href="">Sair</a>
                </div>

                <div name="invisible" id="littleCart" className="littleCart flex">
                    <div onClick={littleCart} className="cancel">
                        <img src={cancelIcon} />
                    </div>
                    <h2>Carrinho</h2>
                    <p>varzio</p>
                    <button>realizar pagamento</button>                    
                </div>
            </header>
            <main>
                {products.map((product) => (
                    <div id={product.id} key={product.id} onClick={(e) => insertProduct(e.currentTarget.id)} className="product">
                        <h2>{product.tittle}</h2>
                        <p>{`R$: ${product.price}`}</p>
                        <img src={productImg} alt="product item" />
                        <div className="info">
                            <p>{product.description}</p>
                        </div>

                        <div className="add flex">
                            <img src={addCart} />
                        </div> 
                    </div>
                ))}
            </main>
            <footer>
                <p>copyright &copy; Gustavo silva</p>
            </footer>
        </div>
    )
}