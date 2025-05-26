import React from "react"


export default function CarteProduitCommande(produit) {
    return (
        <a className="text-decoration-none d-flex justify-content-center">
            <div className="card flex flex-row" style={{ width: "20rem" }}>
                <img src={`/imagesProduits/img${produit.produit.id}.jpg`} className="card-img-top col" height={100} alt="..." />
                <div className="card-body col">
                    <h5 className="card-title">{produit.produit.name}</h5>
                    <p className="card-text">{produit.produit.description}</p>
                    <p className="card-text">Prix : {produit.produit.price}$</p>
                </div>
            </div>
        </a>
    )
}