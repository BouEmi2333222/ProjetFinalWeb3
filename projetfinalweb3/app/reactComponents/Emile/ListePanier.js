import CartePanier from "./CartePanier";
import { panierStorage } from "../../dbacces/panierStorage"
import { sessionStorage } from "../../dbacces/sessionStorage"
import React from "react"
import "../../css/carte.css";

export default function ListePanier({produits, onRemoveProduct, onCommandeEnvoyer})
{
    const [information,setInformation] = React.useState([])
    const handleRemove = (produit) => {
        panierStorage.removeProduit(event, produit);
        onRemoveProduct(produit);
    };

    React.useEffect(() => {
        async function fetchSession() { 
          const session = await sessionStorage.get()
          session.onsuccess = () => {
            setInformation(session.result)
          }
        }
        fetchSession()
      }, [])
      


    return(
        <>
            {produits.length === 0 ? (
                <p className="text-center">Aucun produit dans votre panier</p>
            ) : (
                <div className="d-flex justify-content-center w-100">
                {Array.from({ length: produits.length }).map((_, index) => (
                    <CartePanier key={index} produit={produits[index]} onRemove={handleRemove} />
                ))}
                </div>
            )}
            {produits.length > 0 && <div className="d-flex flex-column cs-list-panier-div align-items-center w-100">
                <p className="text-center cs-list-panier-text">Total : {produits.reduce((total, produit) => total + produit.price, 0)}$</p>
                <button onClick={onCommandeEnvoyer} className="w-25 cs-carte-button">Commander</button>
            </div>}
        </>
    )
}