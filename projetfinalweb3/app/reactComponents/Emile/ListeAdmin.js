import CarteAdmin from "./CarteAdmin";
import { panierStorage } from "../../dbacces/panierStorage"
import React from "react"

export default function ListeAdmin({produits, onRemoveProduct})
{
    const handleRemove = (produit) => {
        panierStorage.removeProduit(event, produit);
        onRemoveProduct(produit);
    };


    return(
        <>
            <div className="row row-cols-1 row-cols-md-3 m-4 p-4 flex justify-content-center border border-color-primary">
            {Array.from({ length: produits.length }).map((_, index) => (
                <CarteAdmin key={index} produit={produits[index]} onRemove={handleRemove} />
            ))}
            </div>
        </>
    )
}