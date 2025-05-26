import CartePanier from "./CartePanier";
import { panierStorage } from "../../dbacces/panierStorage"
import React from "react"

export default function ListePanier({produits, onRemoveProduct})
{
    const handleRemove = (produit) => {
        panierStorage.removeProduit(event, produit);
        onRemoveProduct(produit);
    };


    return(
        <>
            {produits.length === 0 ? (
                <p className="text-center">Aucun produit dans votre panier</p>
            ) : (
                <div className="row row-cols-1 row-cols-md-3 m-4 p-4 flex justify-content-center border border-color-primary">
                {Array.from({ length: produits.length }).map((_, index) => (
                    <CartePanier key={index} produit={produits[index]} onRemove={handleRemove} />
                ))}
                </div>
            )}
            {produits.length > 0 && <div><p className="text-center">Total : {produits.reduce((total, produit) => total + produit.price, 0)}$</p><button className="btn btn-primary">Commander</button></div>}
        </>
    )
}