import CarteProduit from "./CarteProduit";

export default function ListProduit(produits)
{
    return(
        <>
            {produits.produits.length === 0 ? (
                <p className="text-center">Aucun produit trouvé</p>
            ) : (
                <div className="d-flex flex-wrap cs-liste-produit h-100">
                    {Array.from({ length: produits.produits.length }).map((_, index) => (
                        <CarteProduit key={index} produit={produits.produits[index]} />
                    ))}
                </div>
            )}
        </>
    )
}