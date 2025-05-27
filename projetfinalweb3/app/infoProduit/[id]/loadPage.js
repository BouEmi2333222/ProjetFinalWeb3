'use client'
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from "react"
import ListProduit from "@/app/reactComponents/ListesProduits";
import "../../css/infoProduit.css"
import Link from 'next/link';
import TiltImage from '@/app/reactComponents/Jean-Nicolas/tiltcard';
import { panierStorage } from "../../dbacces/panierStorage"
import { sessionStorage } from "../../dbacces/sessionStorage"
import { useRouter } from 'next/navigation';


export default function LoadPage(params){
    const router = useRouter();
    const [produit, setProduit] = React.useState([]);
    React.useEffect(() => {
        async function fetchPosts() { 
            const response = await fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Article/${params.params}`)
            var json = await response.json()
            setProduit(json)
        }
        fetchPosts()
    }, [])

    const [listProduit, setListProduit] = React.useState([]);
    React.useEffect(() => {
        async function fetchPosts() { 
            const response = await fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Carte`)
            var json = await response.json()
            setListProduit(json)
        }
        fetchPosts()
    }, [])
    
    const [quantity, setQuantity] = useState(0);

    const increase = () => {
        setQuantity(prev => {
            const val = parseInt(prev) || 0;
            return val < produit.nbStock ? val + 1 : val;
        });
    };
    
    const decrease = () => {
        setQuantity(prev => {
            const val = parseInt(prev) || 0;
            return Math.max(0, val - 1);
        });
    };
    

    const handleChange = (e) => {
        const value = e.target.value;
    
        if (/^\d*$/.test(value)) {
            setQuantity(value === "" ? 0 : parseInt(value));
        }
    };

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

        for (let i = 0; i < quantity; i++){
            panierStorage.addProduit(produit)
        }
        router.push('/panier');
    }

    return(<>
        <div className="cs-info-div">
            <div className='d-flex justify-content-around pt-4 pb-4 cs-info-second-div'>
                <div className="cs-info-image-div">
                    <TiltImage src={`/imagesProduits/img${produit.id}.jpg`} />
                </div>
                <div className="cs-info-produit">
                    <div className='cs-top-info-produit'>
                        <h4>{produit.name}</h4>
                        <p>{produit.description}</p>
                    </div>
                    <div className='cs-bottom-info-produit'>
                        <div className='d-flex justify-content-end cs-info-text'>
                            <p>Quantitée En Stock : {produit.nbStock}</p>
                        </div>
                        <div className='d-flex justify-content-between cs-info-text w-100'>
                            <div className='d-flex cs-info-button-div'>
                                <button onClick={decrease}><i className="bi bi-dash"></i></button>
                                <input type="text" value={quantity} onChange={handleChange} placeholder="Quantité"/>
                                <button onClick={increase}><i className="bi bi-plus"></i></button>
                            </div>
                            <p>Prix : {produit.price}</p>
                        </div>
                        {isLoggedIn && (<button onClick={handleSubmit} className="w-100 cs-info-inner-button">Ajouter au panier</button>)}
                    </div>
                </div>
            </div>
            <div className='d-flex flex-column align-items-center pb-3'>
                <div className='d-flex justify-content-between cs-info-inner-div'>
                    <h3 className="">Cartes Populaires</h3>
                    <Link href={"/recherche/Carte"} className='cs-link-info'>Voir Plus</Link>
                </div>
                <ListProduit produits={listProduit}/>
            </div>
        </div>
    </>
    )
}