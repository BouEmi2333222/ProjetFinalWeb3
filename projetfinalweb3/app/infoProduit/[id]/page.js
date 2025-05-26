import LoadPage from "./loadPage"
export default async function Accueil({params}) {
    const produit = await params
    console.log("Page.js : ");
    console.log(produit);
    return (
        <LoadPage params={produit.id}/>
    )
}
