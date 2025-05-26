import LoadPage from "./loadPage"
import "../../css/recherche.css"
export default async function Accueil({params}) {
    const recherche = await params
    return (
        <>
            <div className="cs-recherche-div">
                <h1>Section : {recherche.section.endsWith("s") ? recherche.section : recherche.section + "s"}</h1>
                <LoadPage params={recherche.section}/>
            </div>
        </>
    )
}
