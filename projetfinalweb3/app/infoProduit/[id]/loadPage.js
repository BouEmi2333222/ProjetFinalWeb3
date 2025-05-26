'use client'
import 'bootstrap/dist/css/bootstrap.css';
import React from "react"
import ListProduit from "@/app/reactComponents/ListesProduits";
import "../../css/infoProduit.css"

export default function LoadPage(params){
    const [produit, setProduit] = React.useState([]);
    React.useEffect(() => {
        async function fetchPosts() { 
            const response = await fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Article/${params.params}`)
            var json = await response.json()
            setProduit(json)
        }
        fetchPosts()
    }, [])

    const [listProduit, setListProduit] = React.useState([]);
    React.useEffect(() => {
        async function fetchPosts() { 
            const response = await fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Carte`)
            var json = await response.json()
            setListProduit(json)
        }
        fetchPosts()
    }, [])

    return(<>
        <div className="cs-info-div">
            <div>
                <div className="cs-info-image">
                    <img src={`/${produit}`}></img>
                </div>
                <div>

                </div>
            </div>
            <ListProduit produits={listProduit}/>
        </div>
    </>
    )
}