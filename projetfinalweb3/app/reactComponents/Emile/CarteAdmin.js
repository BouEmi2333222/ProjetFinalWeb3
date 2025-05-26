import React from "react"

import { useRouter } from "next/navigation"


export default function CartePanier({ produit, onRemove }) {
    const router = useRouter()
    return (
        <a href="#" className="text-decoration-none d-flex justify-content-center">
            <div className="card flex flex-row" style={{ width: "20rem" }}>
                <img src="https://th.bing.com/th/id/R.82888ecdc2a2c3efb35de51fdffe8f34?rik=4nnfXzANK8xHiA&pid=ImgRaw&r=0" className="card-img-top col" height={150} alt="..." />
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