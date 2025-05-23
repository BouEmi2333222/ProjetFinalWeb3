'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Header from "./reactComponents/Header.js"
import 'bootstrap/dist/css/bootstrap.css';
import Footer from "./reactComponents/Footer";
import Card from "./reactComponents/CarteProduit";
import Carousel from "./reactComponents/Emile/Carousel";
import ListCards from "./reactComponents/ListesProduits";
import React from "react"

export default function Home() {
  const [cartes, setCartes] = React.useState([])
    React.useEffect(() => {
        async function fetchPosts() { 
            const response = await fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Booster`)
            var json = await response.json()
            setCartes(json)
        }
        fetchPosts()
    }, [])
  return (<>
    <Header/>
    <Carousel/>
    <ListCards produits={cartes}/>
    <Footer/>
    </>
  )
}
