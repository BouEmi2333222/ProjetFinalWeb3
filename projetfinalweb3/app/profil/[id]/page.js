'use client'

import 'bootstrap/dist/css/bootstrap.css';
import { sessionStorage } from "../../dbacces/sessionStorage.js"
import { useRouter } from "next/navigation"
import LoadPage from "./LoadPage.js";
import React, {useState, useEffect} from "react"
import CarteCommande from "@/app/reactComponents/Emile/CarteCommande.js";

export default function Profil(){
    const router = useRouter()
    const [information, setInformation] = React.useState([])
    const [commandes, setCommandes] = React.useState([])
    React.useEffect(() => {
        async function fetchPosts() { 
            const session = await sessionStorage.get()
            session.onsuccess = () => {
                setInformation(session.result)
            }
        }

        async function fetchCommandes() { 
            const response = await fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Commande/client`,{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${information.result.token}`,
                    'Content-Type': 'application/json'
                },
            })
            var json = await response.json()
            setCommandes(json)
        }
        fetchPosts()
        if (information && information.result && information.result.token) {
                fetchCommandes()
        }
    }, [])

    //json-server pas terminer
    /*export default function Profil() {
        const router = useRouter();
        const [information, setInformation] = useState(null);
        const [commandes, setCommandes] = useState([]);
      
        useEffect(() => {
          async function fetchSessionAndData() {
            try {
                const session = await sessionStorage.get();
                if (!session) {
                  router.push("/connexion");
                  return;
                }
                
                const { username, id } = session;
                console.log("id:", id);
                console.log("username:", username);
                
      
              // Fetch full user info (optional if session already has enough)
              const userResponse = await fetch(`http://localhost:3001/utilisateurs?id=${id}`);
              const userData = await userResponse.json();
              if (userData.length === 0) {
                console.error("Utilisateur introuvable");
                return;
              }
      
              setInformation(userData[0]);
      
              // Fetch commandes (assuming each has a userId)
              const commandesResponse = await fetch(`http://localhost:3001/commandes?userId=${id}`);
              const commandesData = await commandesResponse.json();
              setCommandes(commandesData);
            } catch (error) {
              console.error("Erreur lors du chargement des données :", error);
            }
          }
      
          fetchSessionAndData();
        }, []);*/

    function Deconnexion() {
        sessionStorage.delete()
        router.push('../../connexion')
    }
    return(<>
    <div className='cs-profil-div'>
        <h1 className="text-center pt-3">Profil</h1>
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <div className="cs-inner-profile-div d-flex justify-content-center p-5 mb-3">
                <ul>
                    <li>Username : {information && information.username} </li>
                    <button onClick={Deconnexion} className="btn btn-primary">Déconnexion</button>
                </ul>
            </div>
            <div className="row justify-content-center">
                <h1 className="text-center">Vos Commandes</h1>
                <div>
                    {Array.from({ length: commandes.length }).map((_, index) => (
                        <CarteCommande key={index} produit={commandes[index]} onRemove={handleRemove} />
                    ))}
                </div>
            </div>
        </div>
    </div>
</>)

}