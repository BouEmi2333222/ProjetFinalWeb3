import LoadPage from "./loadPage"
import 'bootstrap/dist/css/bootstrap.css';
import '../../../css/recherche.css'
export default async function Accueil({params}) {
    const recherche = await params
    return (
        <>
        <div className="cs-recherche-div">
            <h1>Recherche : {recherche.texte}</h1>
            <LoadPage params={recherche.texte}/>
        </div>
        </>
    )
}
