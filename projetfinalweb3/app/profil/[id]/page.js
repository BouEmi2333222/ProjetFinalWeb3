'use client'

import Header from "../../reactComponents/Header.js"
import 'bootstrap/dist/css/bootstrap.css';
import Footer from "../../reactComponents/Footer";
import { sessionStorage } from "../../dbacces/sessionStorage.js"
import { useRouter } from "next/navigation"
import LoadPage from "./LoadPage.js";
import React from "react"
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

    function Deconnexion() {
        sessionStorage.delete()
        router.push('../../connexion')
    }
    return(<><Header/>
    <h1 className="text-center">Profil</h1>
    <div className="container">
        <div className="row justify-content-center">
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
<Footer/></>)

}