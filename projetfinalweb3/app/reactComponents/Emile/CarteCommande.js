import React from "react";
import { sessionStorage } from "../../dbacces/sessionStorage";
import CarteProduitCommande from "./CarteProduitCommande";

export default function CarteCommande({commande, handleCommandePreparer, handleCommandeEnvoyer, handleCommandeSupprimer}) {
    const [information, setInformation] = React.useState([])
    React.useEffect(() => {
        async function fetchPosts() { 
            const session = await sessionStorage.get()
            session.onsuccess = () => {
                setInformation(session.result)
            }
        }
        fetchPosts()
    }, [])
    
  
    return (
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Commande n°{commande.commande.id}</h3>
            <p className="card-text">Date de commande : {new Date(commande.commande.dateCommande).toLocaleString()}</p>
            <p className="card-text">Etat de la commande : {commande.commande.preparer && commande.commande.envoyer ? (
                                          "Commande préparée et envoyée"
                                      ) : commande.commande.preparer ? (
                                          "Commande préparée"
                                      ) : (
                                          "Commande en cours de préparation"
                                      )}</p>
            <h4 className="card-text">Articles :</h4>
            {commande.articles.map((produit) => <CarteProduitCommande key={produit.id} produit={produit} />)}
            <p className="card-text">Prix total : {commande.articles.reduce((total, produit) => total + produit.price, 0)}$</p>
            {!commande.commande.preparer && <button onClick={() => handleCommandePreparer(commande.commande.id)} className="btn btn-primary">Preparer</button>}
            {!commande.commande.envoyer && <button onClick={() => handleCommandeEnvoyer(commande.commande.id)} className="btn btn-primary">Envoyer</button>}
            <button onClick={() => handleCommandeSupprimer(commande.commande.id)} className="btn btn-primary">Supprimer</button>
          </div>
        </div>
      )
}