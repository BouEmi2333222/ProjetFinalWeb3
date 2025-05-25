"use client"
import { sessionStorage } from "../dbacces/sessionStorage"
import React from "react"
import { useRouter } from "next/navigation"
import "../css/header.css"
import 'bootstrap-icons/font/bootstrap-icons.css';



export default function Header() {
    const router = useRouter()
    const [information, setInformation] = React.useState([])
    React.useEffect(() => {
        async function fetchPosts() { 
            const session = await sessionStorage.get()
            session.onsuccess = () => {
                setInformation(session)
            }
        }
        fetchPosts()
    }, [])
    console.log(information && information.result)
    function loadUrlProfil(){
        if (!information.result || !information.result.id){
            return "../connexion"
        } 
        else {
            return "../profil/1"
        }
    }
    
    function loadUrlPanier(){
        if (!information.result || !information.result.id) return "../../connexion"
        else return "../../panier"
    }
    const [searchTerm, setSearchTerm] = React.useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        router.push(`../recherche/Articles/${searchTerm}`);
    }
    
    return (
        <header className="cs-mainHeight">
            <nav className="cs-blue-color">
                <div className="d-flex justify-content-between pt-3 h-75 align-items-center">
                    <div className="cs-logo-div">
                        <a className="cs-logo-a" href="../">
                            <img className="cs-logo" /*height={100}*/ src="/logo.png"></img>
                        </a>
                    </div>
                    <div className="cs-searchbar-div">
                        <i className="bi bi-search cs-creme-color"></i>
                        <form onSubmit={handleSubmit} /*className="col flex mx-5"*/ role="search" className="cs-searchbar-form">
                            <input onChange={(e) => setSearchTerm(e.target.value)} className="form-control" type="search" placeholder="Rechercher" aria-label="Rechercher"></input>
                        </form>
                    </div>
                    <div className="cs-icon-div">
                        <a href={loadUrlPanier()} className="cs-icon-a d-flex justify-content-center">
                            <i className="bi bi-cart cs-creme-color cs-icons"></i>
                        </a>
                        <a href={loadUrlProfil()} className="cs-icon-a d-flex justify-content-center">
                            <i className="bi bi-person-circle cs-creme-color cs-icons"></i>
                        </a>
                    </div>
                </div>
                <div className="navbar navbar-expand-md h-25">
                    <div className="container-fluid flex justify-content-center">
                        <div className="navbar-nav mb-2 mb-md-0 row">
                            <li className="nav-item dropdown mx-5 col">
                                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                    accessoires
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="../../recherche/Accessoires">Deck box</a></li>
                                    <li><a className="dropdown-item" href="../../recherche/Accessoires">Tapis de jeu</a></li>
                                    <li><a className="dropdown-item" href="../../recherche/Accessoires">Sleeves</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown mx-5 col">
                                <a className="nav-link dropdown-toggle " href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                    Magic The Gathering
                                </a>
                                <ul className="dropdown-menu mx-3">
                                    <li><a className="dropdown-item" href="../../recherche/Carte">Cartes</a></li>
                                    <li><a className="dropdown-item" href="../../recherche/Booster">Boosters</a></li>
                                    <li><a className="dropdown-item" href="../../recherche/Boite">Boites</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown mx-5 col">
                                <a className="nav-link dropdown-toggle " href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                    nouveautés
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="../../recherche/Article">Rien</a></li>
                                    <li><a className="dropdown-item" href="../../recherche/Article">Encore Rien</a></li>
                                    <li><a className="dropdown-item" href="../../recherche/Article">Toujours Rien</a></li>
                                </ul>
                            </li>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}