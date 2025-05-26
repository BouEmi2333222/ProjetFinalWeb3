import { panierStorage } from "../dbacces/panierStorage"
import { sessionStorage } from "../dbacces/sessionStorage"
import React from "react"


export default function CarteProduit(produit) {
    const [isLoggedIn, setIsLoggedIn] = React.useState([])
    React.useEffect(() => {
        async function fetchPosts() { 
            const session = await sessionStorage.get()
            session.onsuccess = () => {
                setIsLoggedIn(session.result && session.result.id ? true : false)
            }
        }
        fetchPosts()
    }, [])
    async function handleSubmit() {
        panierStorage.addProduit(produit.produit)
    }
    return (
        <a href="#" className="text-decoration-none d-flex justify-content-center">
            <div className="card flex flex-row" style={{ width: "20rem" }}>
                <img src="https://th.bing.com/th/id/R.82888ecdc2a2c3efb35de51fdffe8f34?rik=4nnfXzANK8xHiA&pid=ImgRaw&r=0" className="card-img-top col" height={150} alt="..." />
                <div className="card-body col">
                    <h5 className="card-title">{produit.produit.name}</h5>
                    <p className="card-text">{produit.produit.description}</p>
                    <p className="card-text">Prix : {produit.produit.price}$</p>
                    {isLoggedIn && (<button onClick={handleSubmit} className="btn btn-primary">Ajouter au panier</button>)}
                    
                </div>
            </div>
        </a>
    )
}