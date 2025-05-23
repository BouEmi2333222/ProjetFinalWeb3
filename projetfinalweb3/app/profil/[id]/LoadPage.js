import Header from "../../reactComponents/Header.js"
import 'bootstrap/dist/css/bootstrap.css';
import Footer from "../../reactComponents/Footer.js";
import { sessionStorage } from "../../lib/sessionStorage.js"
import React from "react"

export default function LoadPage(information){
    
    console.log(information.information.username)
    return(<><Header/>
        <h1 className="text-center">Profil</h1>
        <div className="container">
            <div className="row justify-content-center">
                <ul>
                    <li>Username : </li>
                    <li>Email : </li>
                </ul>
            </div>
        </div>
    <Footer/></>)
}