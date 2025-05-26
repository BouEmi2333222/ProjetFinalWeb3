'use client'
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from "react"
import ListProduit from "@/app/reactComponents/ListesProduits";

export default function LoadPage(params){
    const [produit, setProduit] = React.useState([])
    React.useEffect(() => {
        async function fetchPosts() { 
            const response = await fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/${params.params}`)
            var json = await response.json()
            setProduit(json)
        }
        fetchPosts()
    }, [])


    //json-server
    /*export default function LoadPage(params) {
    const [produit, setProduit] = useState([]);

    useEffect(() => {
        async function fetchProduits() {
        try {
            const response = await fetch(`http://localhost:3001/produits?type=${params.params}`);
            const data = await response.json();
            setProduit(data);
            if (params.params == "Article")
            {
                const response = await fetch(`http://localhost:3001/produits`);
                const data = await response.json();
                setProduit(data);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des produits :", error);
        }
        }

        fetchProduits();
    }, []);*/

    return(<>
    <ListProduit produits={produit}/>
    </>
    )
}