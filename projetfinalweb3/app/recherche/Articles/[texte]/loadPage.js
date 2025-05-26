'use client'
import Image from "next/image";
import styles from "../../../page.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import React, {useState, useEffect} from "react"
import ListProduit from "@/app/reactComponents/ListesProduits";

export default function LoadPage(params){
    const [produit, setProduit] = React.useState([])
    React.useEffect(() => {
        async function fetchPosts() { 
            const response = await fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Article/recherche/${params.params}`)
            var json = await response.json()
            setProduit(json)
        }
        fetchPosts()
    }, [])

    /* //json-server
    export default function LoadPage(params) {
        const [produit, setProduit] = useState([]);
    
        useEffect(() => {
            async function fetchProduits() {
                try {
                    const response = await fetch(`http://localhost:3001/produits`);
                    const data = await response.json();
    
                    const filtered = data.filter(item =>
                        item.name.toLowerCase().includes(params.params.toLowerCase())
                    );
    
                    setProduit(filtered);
                } catch (error) {
                    console.error("Erreur lors de la récupération des produits :", error);
                }
            }
    
            fetchProduits();
        }, [params.params]);*/

    return(<>
    <ListProduit produits={produit}/>
    </>
    )
}