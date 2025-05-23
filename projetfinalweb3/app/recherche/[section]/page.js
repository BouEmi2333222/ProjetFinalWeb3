import LoadPage from "./loadPage"
export default async function Accueil({params}) {
    const recherche = await params
    return (
        <LoadPage params={recherche.section}/>
    )
}
