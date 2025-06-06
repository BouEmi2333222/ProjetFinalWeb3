import React from "react"

import { useRouter } from "next/navigation"

export default function CartePanier({ produit, onRemove }) {
    const router = useRouter()
    const thisid = produit.id;
    console.log(produit.id)
    return (
        <a href="#" className="text-decoration-none d-flex justify-content-center">
            <div className="card flex flex-row" style={{ width: "20rem" }}>
                <img src={`/imagesProduits/img${thisid}.jpg`} className="card-img-top col" height={100} alt="..." />
                <div className="card-body col">
                    <h5 className="card-title">{produit.name}</h5>
                    <p className="card-text">{produit.description}</p>
                    <p className="card-text">Prix : {produit.price}$</p>
                    <p className="card-text">Quantité : {produit.nbStock}</p>
                    <p className="card-text">Id : {produit.id}</p>
                </div>
            </div>
        </a>
    )
}