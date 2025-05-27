'use client'
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ListePanier from "../reactComponents/Emile/ListePanier";
import { panierStorage } from "../dbacces/panierStorage"
import { sessionStorage } from "../dbacces/sessionStorage"
import CheckoutButton from "../reactComponents/Jean-Nicolas/CheckoutButton";
import "../css/panier.css";

export default function Panier(){
    const [information, setInformation] = React.useState([])
    const [result, setResult] = React.useState([])
    const [produits, setProduits] = React.useState([])

    React.useEffect(() => {
        async function fetchPosts() { 
            const response = await panierStorage.getAllProduit()
            setProduits(response)
        }
        fetchPosts()
    }, [])
    React.useEffect(() => {
        async function fetchSession() { 
          const session = await sessionStorage.get()
          session.onsuccess = () => {
            console.log(session)
            setInformation(session.result)
          }
        }
        fetchSession()
      }, [])
    const handleRemoveProduct = (produit) => {
        setProduits(produits.filter((p) => p !== produit));
    };


    const handleCommandeEnvoyer = () => {
        const response = fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Commande`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${information.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(produits)
        });
        console.log(JSON.stringify(produits))
        response.then(response => {
          if (response.ok) {
            setResult('Commande a été envoyé avec success');
            panierStorage.removeAllProduit();
            setProduits([]);
          } else {
            setResult('Envoie de la commande a echoué');
          }
        })
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
        { result !== null && (
                <div className="alert alert-danger" role="alert">
                    {result}
                </div>
                )}
        <ListePanier produits={produits} onRemoveProduct={handleRemoveProduct} onCommandeEnvoyer={handleCommandeEnvoyer}/>
        <CheckoutButton cartItems={produits}/>
    </div>
    </>)
}