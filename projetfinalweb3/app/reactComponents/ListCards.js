'use client'
import Card from "./Card";
import React from "react"

export default function ListCards()
{
    const [cartes, setCartes] = React.useState([])
    React.useEffect(() => {
        async function fetchPosts() {
            const response = await fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Carte`)
            var json = await response.json()
            setCartes(json)
        }
        fetchPosts()
    }, [])
    console.log(cartes)
    console.log(cartes[0])
    return(
        <>
            <h3 className="text-center">Cartes Populaires</h3>
            <div className="row row-cols-1 row-cols-md-3 m-4 p-4 flex justify-content-center border border-color-primary">
                {Array.from({ length: cartes.length }).map((_, index) => (
                    <Card key={index} carte={cartes[index]} />
                ))}
            </div>
        </>
    )
}