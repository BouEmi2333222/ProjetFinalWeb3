import 'bootstrap/dist/css/bootstrap.css';
import { sessionStorage } from "../../dbacces/sessionStorage.js"
import React from "react"
import "../../css/other.css"

export default function LoadPage(information){
    
    //console.log(information.information.username)
    return(<>
        <h1 className="text-center">Profil</h1>
        <div className="container">
            <div className="row justify-content-center">
                <ul>
                    <li>Username : </li>
                    <li>Email : </li>
                </ul>
            </div>
        </div>
    </>)
}