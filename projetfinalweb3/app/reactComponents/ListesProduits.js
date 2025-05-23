
import CarteProduit from "./CarteProduit";


export default function ListProduit(produits)
{
    return(
        <>
            <h3 className="text-center">Cartes Populaires</h3>
            <div className="row row-cols-1 row-cols-md-3 m-4 p-4 flex justify-content-center border border-color-primary">
                {Array.from({ length: produits.produits.length }).map((_, index) => (
                    <CarteProduit key={index} produit={produits.produits[index]} />
                ))}
            </div>
        </>
    )
}