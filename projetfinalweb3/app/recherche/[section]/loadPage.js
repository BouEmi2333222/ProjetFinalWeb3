'use client'
import Image from "next/image";
import styles from "../../page.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import React from "react"
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
    return(<>
    <ListProduit produits={produit}/>
    </>
    )
}