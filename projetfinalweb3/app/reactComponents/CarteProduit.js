import { panierStorage } from "../dbacces/panierStorage"
import { sessionStorage } from "../dbacces/sessionStorage"
import React from "react";
import Link from 'next/link';
import "../css/carte.css";

export default function CarteProduit(produit) {
    const [isLoggedIn, setIsLoggedIn] = React.useState([])
    React.useEffect(() => {
        async function fetchPosts() { 
            const session = await sessionStorage.get()
            session.onsuccess = () => {
                setIsLoggedIn(session.result && session.result.id ? true : false)
            }
        }
        fetchPosts()
    }, [])
    async function handleSubmit() {
        panierStorage.addProduit(produit.produit)
    }
    return (
        <>
            <div className="cs-card-div cs-grow-carte">
                <Link href={`/infoProduit/${produit.produit.id}`} className="text-decoration-none cs-link">
                    <img src={`/imagesProduits/img${produit.produit.id}.jpg`} className="cs-carte-image" alt="..." />
                    <div className="d-flex flex-column cs-inner-card">
                        <h5 className="cs-carte-text">{produit.produit.name}</h5>
                        <p className="cs-carte-text">{produit.produit.description}</p>
                        <div className="d-flex justify-content-between">
                            <p className="cs-carte-text">Prix : {produit.produit.price}$</p>
                            <p className="cs-carte-text text-center">Quantitée : {produit.produit.nbStock}</p>
                        </div>
                    </div>
                </Link>
                {isLoggedIn && (<button onClick={handleSubmit} className="w-100 cs-carte-button">Ajouter au panier</button>)}
            </div>
        </>
    )
}