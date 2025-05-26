import React from "react"


export default function CarteProduitCommande(produit) {
    return (
        <a className="text-decoration-none d-flex justify-content-center">
            <div className="card flex flex-row" style={{ width: "20rem" }}>
                <img src="https://th.bing.com/th/id/R.82888ecdc2a2c3efb35de51fdffe8f34?rik=4nnfXzANK8xHiA&pid=ImgRaw&r=0" className="card-img-top col" height={150} alt="..." />
                <div className="card-body col">
                    <h5 className="card-title">{produit.produit.name}</h5>
                    <p className="card-text">{produit.produit.description}</p>
                    <p className="card-text">Prix : {produit.produit.price}$</p>
                </div>
            </div>
        </a>
    )
}