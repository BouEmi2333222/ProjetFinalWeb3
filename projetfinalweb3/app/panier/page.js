'use client'
import React from "react";
import Header from "../reactComponents/Header";
import 'bootstrap/dist/css/bootstrap.css';
import Footer from "../reactComponents/Footer";
import ListePanier from "../reactComponents/Emile/ListePanier";
import { panierStorage } from "../dbacces/panierStorage"

export default function Panier(){
    const [produits, setProduits] = React.useState([])

    React.useEffect(() => {
        async function fetchPosts() { 
            const response = await panierStorage.getAllProduit(event)
            setProduits(response)
        }
        fetchPosts()
    }, [])
    const handleRemoveProduct = (produit) => {
        setProduits(produits.filter((p) => p !== produit));
    };

    return(<>
    <Header/>
    <h1 className="text-center">Votre Panier</h1>
    <ListePanier produits={produits} onRemoveProduct={handleRemoveProduct}/>
    
    <Footer/></>)
}