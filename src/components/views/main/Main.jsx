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
    const apiUrlBase = "https://ecommerce-af59.onrender.com"
    const [userProducts, setUserProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [carts, setCarts] = useState([]);
    const [userCarts, setUserCarts] = useState([]);
    const [finalPrice, setFinalPrice] = useState(0);
    
    async function getProducts(){
        const data = await axios.get(apiUrlBase + "/products");
        setProducts(data.data);
    }
    async function getCarts(){
        const data = await axios.get(apiUrlBase + "/carts");
        setCarts(data.data);
    }

    const getUserCarts = () => {
        const userId = localStorage.getItem("id");
        const userCart = carts?.filter((cart) => cart.user_id === userId && cart.stats === "nopay");

        if (userCart?.length) {
            setUserCarts(userCart);
            return;
        }
        return;
    }

    const getUserProducts = () => {
        const listAux = []
        userCarts.forEach((cart) => {
            products.forEach((product) => {
                if (cart.product_id === product.id) {
                    listAux.push(product);
                }
            })
        })
        setUserProducts(listAux);
    }

    const getFinalPrice = () => {
        let price = 0
        userProducts.map((product) => {
            price = price + product.price
        })
        setFinalPrice(price);
    }
   
    useEffect(() => {
        getProducts();
        getCarts();
        getUserCarts();
    }, []);
    useEffect(() => getProducts, [products])
    useEffect(() => {
        getCarts();
        getUserCarts();
        getUserProducts();
        getFinalPrice();
    }, [carts] )

    function moreInfo() {
        let visible = document.getElementById("menu");
        const sheet = new CSSStyleSheet();

        if (visible.name == "visible"){
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
        let exist = false;
        userCarts?.forEach((cart) => {
            if (cart.product_id === key) {
                exist = true;
            }
        })

        if (exist){
            window.alert("Este produto ja está no carrinho");
            return;
        }else{
            const user_id = localStorage.getItem("id");
            const product_id = key;
            const stats = "nopay";
            await axios.post(apiUrlBase + "/carts", {user_id, product_id, stats});
            window.alert("Produto adicionado ao carrinho")
            return;
        }
        
    }

    const removeProduct = async (productId) => {
        let url = ""
        userCarts?.map((cart) => {
            if (cart.product_id === productId) {
                url = apiUrlBase + "/carts/" + cart.id
            }
        })
        await axios.delete(url);
        getCarts()
    }

    const removeAllProducts = async () => {
        userProducts.forEach( async (product) => {
            await removeProduct(product.id);
        })
    }

    return (
        <div className="mainScreen">
            <header>
                <h1 className="logo font-effect-emboss">SirShops</h1>
                <div className="btn" onClick={moreInfo} >
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
                <Link to="/">sair</Link>
                </div>

                <div name="invisible" id="littleCart" className="littleCart flex">
                    <div onClick={littleCart} className="cancel">
                        <img src={cancelIcon} />
                    </div>
                    <h2>Carrinho</h2>
                    <div className="cartProducts">
                        {(userProducts?.length) ? <p></p> : <p>vazio</p>}
                        {userProducts.map((product) => (
                            <div className="cartProduct" id={product.id} key={product.id}>
                                <div>
                                   <p className="titleProduct">{product.tittle}</p>
                                    <p>R$: {product.price}</p> 
                                </div>
                                <button name={product.id} onClick={(e) => {
                                    removeProduct(e.currentTarget.name);

                                }}>remover</button>
                            </div>
                        ))}
                    </div>
                    <p>Valor total: R$ {finalPrice}</p>
                    <button className="payCart" onClick={removeAllProducts}>realizar pagamento</button>                    
                </div>
            </header>
            <main>
                {products?.map((product) => (
                    <div id={product.id} key={product.id} className="product">
                        <h2>{product.tittle}</h2>
                        <p>{`R$: ${product.price}`}</p>
                        <img src={productImg} alt="product item" />
                        <div className="info">
                            <p>{product.description}</p>
                        </div>

                        <button name={product.id} className="add flex" onClick={(e) => insertProduct(e.currentTarget.name)}>
                            <img src={addCart} />
                        </button> 
                    </div>
                ))}
            </main>
            <footer>
                <p>copyright &copy; Gustavo silva</p>
            </footer>
        </div>
    )
}