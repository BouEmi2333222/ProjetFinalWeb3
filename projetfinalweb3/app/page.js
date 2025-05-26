'use client'
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from "./reactComponents/Emile/Carousel";
import ListCards from "./reactComponents/ListesProduits";
import React from "react";
import "./css/app.css";
import Link from 'next/link';

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

    console.log(cartes);
  return (<>
    <div className="cs-background d-flex flex-column align-items-center">
      <div className="cs-carousel-div-app">  
        <Carousel/>
      </div>
      <div className='cs-populaire-div'>
        <div className="d-flex justify-content-between cs-populaire-inner-div">
          <h3 className="">Cartes Populaires</h3>
          <Link href={"/recherche/Carte"} className='cs-link-populaire'>Voir Plus</Link>
        </div>
        <ListCards produits={cartes}/>
      </div>
      <div className='cs-populaire-div'>
          <h3 className="text-center">Autres Cartes</h3>
        <ListCards produits={cartes}/>
      </div>
    </div>
    </>
  )
}
