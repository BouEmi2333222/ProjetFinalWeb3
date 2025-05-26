import React from "react";
import { sessionStorage } from "../../dbacces/sessionStorage";
import CarteProduitCommande from "./CarteProduitCommande";

export default function CarteCommande({commande}) {
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
    const handleCommandePreparer = (commandeId) => {
        const response = fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Commande/${commandeId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${information.result.token}`,
            'Content-Type': 'application/json'
          }
        });
      
        response.then(response => {
          if (response.ok) {
            console.log('Commande prepared successfully');
          } else {
            console.error('Failed to prepare commande');
          }
        })
      }
  

    const handleCommandeEnvoyer = (commandeId) => {
        const response = fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Commande/${commandeId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${information.result.token}`,
            'Content-Type': 'application/json'
          }
        });
      
        response.then(response => {
          if (response.ok) {
            console.log('Commande sent successfully');
          } else {
            console.error('Failed to send commande');
          }
        })
      }
  
      const handleCommandeSupprimer = (commandeId) => {
        const response = fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Commande/${commandeId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${information.result.token}`,
            'Content-Type': 'application/json'
          }
        });
      
        response.then(response => {
          if (response.ok) {
            console.log('Commande removed successfully');
          } else {
            console.error('Failed to remove commande');
          }
        })
      }
  
    console.log(commande)
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