import Card from "./Card";
export default function ListCards()
{
    return(
        <>
            <h3 className="text-center">Cartes Populaires</h3>
            <div className="row row-cols-1 row-cols-md-3 m-4 p-4 flex justify-content-center border border-color-primary">
                {Array.from({ length: 9 }).map((_, index) => (
                    <Card key={index} />
                ))}
            </div>
        </>
    )
}