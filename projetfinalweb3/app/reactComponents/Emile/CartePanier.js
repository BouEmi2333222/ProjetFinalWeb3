import React from "react"
import Link from 'next/link';
import "../../css/carte.css";

import { useRouter } from "next/navigation"


export default function CartePanier({ produit, onRemove }) {
    const router = useRouter()
    const id = produit.id;
    return (
        <div className="cs-card-div cs-grow-carte">
        <Link href={`/infoProduit/${produit.id}`} className="text-decoration-none cs-link">
            <img src={`/imagesProduits/img${produit.id}.jpg`} className="cs-carte-image" alt="..." />
            <div className="d-flex flex-column cs-inner-card">
                <h5 className="cs-carte-text">{produit.name}</h5>
                <p className="cs-carte-text">{produit.description}</p>
                <div className="d-flex justify-content-between">
                    <p className="cs-carte-text">Prix : {produit.price}$</p>
                    <p className="cs-carte-text text-center">Quantitée : {produit.nbStock}</p>
                </div>
            </div>
        </Link>
        <button onClick={() => {onRemove(produit); router.push('/panier')}} className="w-100 cs-carte-button">Supprimer</button>
        </div>
    )
}