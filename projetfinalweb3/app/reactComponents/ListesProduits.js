
import CarteProduit from "./CarteProduit";


export default function ListProduit(produits)
{

    return(
        <>
            {produits.produits.length === 0 ? (
                <p className="text-center">Aucun produit trouvé</p>
            ) : (
                <div className="row row-cols-1 row-cols-md-3 m-4 p-4 flex justify-content-center border border-color-primary">
                {Array.from({ length: produits.produits.length }).map((_, index) => (
                    <CarteProduit key={index} produit={produits.produits[index]} />
                ))}
                </div>
            )}
        </>
    )
}