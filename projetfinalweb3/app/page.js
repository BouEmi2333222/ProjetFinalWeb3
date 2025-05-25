'use client'
import Image from "next/image";
import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import Card from "./reactComponents/CarteProduit";
import Carousel from "./reactComponents/Emile/Carousel";
import ListCards from "./reactComponents/ListesProduits";
import React from "react"

export default function Home() {

  const [cartes, setCartes] = React.useState([])
    React.useEffect(() => {
        async function fetchPosts() { 
          const response = await fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Carte`)
          var json = await response.json()
          setCartes(json)
        }
        fetchPosts()
    }, [])
  return (<>
    <Carousel/>
    <h3 className="text-center">Cartes Populaires</h3>
    <ListCards produits={cartes}/>
    </>
  )
}
