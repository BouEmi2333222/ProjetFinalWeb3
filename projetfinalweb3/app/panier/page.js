'use client'
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ListePanier from "../reactComponents/Emile/ListePanier";
import { panierStorage } from "../dbacces/panierStorage"
import CheckoutButton from "../reactComponents/Jean-Nicolas/CheckoutButton";
import "../css/panier.css";

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

    const handleProduireCommande =  async () => {
        const response = await fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Commande`,{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${information.result.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Username: username,
                    Email: email,
                    Password: password
                    
                })
            });
    }

    return(<>
    <div className="cs-panier-div">
        <h1 className="text-center pt-3 mb-0 pb-3">Votre Panier</h1>
        <ListePanier produits={produits} onRemoveProduct={handleRemoveProduct}/>
    </div>
    </>)
}