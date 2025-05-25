'use client'

import 'bootstrap/dist/css/bootstrap.css';
import { sessionStorage } from "../../dbacces/sessionStorage.js"
import LoadPage from "./LoadPage.js";
import React from "react"

export default function Profil(){
    const [information, setInformation] = React.useState([])
    React.useEffect(() => {
        async function fetchPosts() { 
            const session = await sessionStorage.get()
            session.onsuccess = () => {
                setInformation(session.result)
            }
        }
        fetchPosts()
    }, [])
    return(<>
    <h1 className="text-center">Profil</h1>
    <div className="container">
        <div className="row justify-content-center">
            <ul>
                <li>Username : {information && information.username} </li>
            </ul>
        </div>
    </div>
</>)

}