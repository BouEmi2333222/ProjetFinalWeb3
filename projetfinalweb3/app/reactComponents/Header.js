import { sessionStorage } from "../lib/sessionStorage"
import React from "react"

async function loadUrlProfil(){
    const session = await sessionStorage.get()
    console.log(session)
    if (session === null) return "../connexion"
    else return `../profil/${session.username}`
}

export default function Header() {
    return (
        <header data-bs-theme="light">
            <nav className="bg-light">
                <nav className="navbar navbar-expand-md flex justify-content-center">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="../"><img className="logo" height={100} src="logo.png"></img></a>
                        <form className="col flex mx-5" role="search">
                            <input className="form-control" type="search" placeholder="Rechercher" aria-label="Rechercher"></input>
                        </form>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-cart mx-2" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle mx-5" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                            </svg>
                        </a>
                    </div>
                </nav>
                <nav className="navbar navbar-expand-md">
                    <div className="container-fluid flex justify-content-center">
                        <div className="navbar-nav mb-2 mb-md-0 row">
                            <li className="nav-item dropdown mx-5 col">
                                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                    accessoires
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="../recherche/Accessoires">Deck box</a></li>
                                    <li><a className="dropdown-item" href="../recherche/Accessoires">Tapis de jeu</a></li>
                                    <li><a className="dropdown-item" href="../recherche/Accessoires">Sleeves</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown mx-5 col">
                                <a className="nav-link dropdown-toggle " href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                    Magic The Gathering
                                </a>
                                <ul className="dropdown-menu mx-3">
                                    <li><a className="dropdown-item" href="../recherche/Carte">Cartes</a></li>
                                    <li><a className="dropdown-item" href="../recherche/Booster">Boosters</a></li>
                                    <li><a className="dropdown-item" href="../recherche/Boite">Boites</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown mx-5 col">
                                <a className="nav-link dropdown-toggle " href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                    nouveautés
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="../recherche/Article">Rien</a></li>
                                    <li><a className="dropdown-item" href="../recherche/Article">Encore Rien</a></li>
                                    <li><a className="dropdown-item" href="../recherche/Article">Toujours Rien</a></li>
                                </ul>
                            </li>
                        </div>
                    </div>
                </nav>
            </nav>
        </header>
    );
}