'use client'
import React from 'react'
import Header from '../reactComponents/Header'
import ListeAdmin from '../reactComponents/Emile/ListeAdmin'
import 'bootstrap/dist/css/bootstrap.css';
import Footer from '../reactComponents/Footer'
import { sessionStorage } from '../dbacces/sessionStorage'
import CarteCommande from '../reactComponents/Emile/CarteCommande';
import set from 'localbase/localbase/api/actions/set';

export default function Employe() {
    const [produits, setProduits] = React.useState([])
    const [commandes, setCommandes] = React.useState([])
    const [information, setInformation] = React.useState([])
    const [series, setSeries] = React.useState([])
    const [etatCarte, setEtatCarte] = React.useState([])
    const [typeAcessoire, setTypeAcessoire] = React.useState([])

    React.useEffect(() => {
        async function fetchPosts() { 
          const response = await fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Article`)
          var json = await response.json()
          setProduits(json)
        }
        fetchPosts()
      }, [])
      React.useEffect(() => {
        async function fetchSeries() { 
          const response = await fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Series`)
          var json = await response.json()
          setSeries(json)
        }
        fetchSeries()
      }, [])
      React.useEffect(() => {
        async function fetchEtatCarte() { 
          const response = await fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/EtatCarte`)
          var json = await response.json()
          setEtatCarte(json)
        }
        fetchEtatCarte()
      }, [])

      React.useEffect(() => {
        async function fetchTypeAcessoire() { 
          const response = await fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/TypeAccessoires`)
          var json = await response.json()
          setTypeAcessoire(json)
        }
        fetchTypeAcessoire()
      }, [])
      
      React.useEffect(() => {
        async function fetchSession() { 
          const session = await sessionStorage.get()
          session.onsuccess = () => {
            setInformation(session)
          }
        }
        fetchSession()
      }, [])
      
      React.useEffect(() => {
        if (information && information.result && information.result.token) {
          async function fetchCommandes() { 
            const response = await fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Commande`,{
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${information.result.token}`,
                'Content-Type': 'application/json'
              },
            })
            var json = await response.json()
            setCommandes(json)
          }
          fetchCommandes()
        }
      }, [information])

    const handleRemoveProduct = (produit) => {
        setProduits(produits.filter((p) => p !== produit));
    };

    const [showProducts, setShowProducts] = React.useState(true);
    const [showCommandes, setShowCommandes] = React.useState(false);
    const [type, setType] = React.useState("Booster");

    const handleTypeChange = (event) => {
      setType(event.target.value);
    };
    const onSubmit = (event) => {
      event.preventDefault();
      const formData = event.target;
      var product = {
        Name: formData.name.value,
        Description: formData.description.value,
        Price: parseFloat(formData.price.value),
        Image: null,
        NbStock: parseInt(formData.nbStock.value),
      };
      switch (type) {
        case 'Booster':
          const selectedSeries = series.find((serie) => serie.name === formData.seriesIdBooster.value);
          const selectedSeriesId = selectedSeries.id;

          product = {
            ...product,
            Collector: formData.isCollector.checked,
            SeriesId: selectedSeriesId,
            NbCarte: parseInt(formData.numberOfCards.value),
          };
          break;
        case 'Boite':
          product = {
            ...product,
            BoosterId: formData.boosterId.value,
            QtBoosters: parseInt(formData.quantityOfBoosters.value),
          };
          break;
        case 'Carte':
          const selectedSeriesCarte = series.find((serie) => serie.name === formData.seriesIdCarte.value);
          const selectedSeriesIdCarte = selectedSeriesCarte.seriesId;

          const selectedEtatCarte = etatCarte.find((etat) => etat.name === formData.etatCarteId.value);
          const selectedEtatCarteId = selectedEtatCarte.etatCarteId; 
          console.log(selectedEtatCarte)
          product = {
            ...product,
            SeriesId: selectedSeriesIdCarte,
            EtatCarteId: selectedEtatCarteId,
          };
          break;
        case 'Accessoires':
          const selectedTypeAcessoire = typeAcessoire.find((type) => type.name === formData.typeAcessoireId.value);
          const selectedTypeAcessoireId = selectedTypeAcessoire.typeAccessoiresId;
          product = {
            ...product,
            TypeAccessoiresId: selectedTypeAcessoireId,
          };
          break;
        default:
          console.error('Invalid product type');
          return;
      }
      console.log(JSON.stringify(product))
      const response = fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/${type}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${information.result.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
    
      response.then(response => {
        if (response.ok) {
          console.log('Product added successfully');
        } else {
          console.error('Failed to add product');
        }
        
      })
    };

    const onSubmitModifier = (event) => {
      event.preventDefault();
      const formData = event.target;
      var product = {
        Id: parseInt(formData.id.value),
        Name: formData.name.value,
        Description: formData.description.value,
        Price: parseFloat(formData.price.value),
        Image: null,
        NbStock: parseInt(formData.nbStock.value),
      };
      switch (type) {
        case 'Booster':
          const selectedSeries = series.find((serie) => serie.name === formData.seriesIdBooster.value);
          const selectedSeriesId = selectedSeries.id;

          product = {
            ...product,
            Collector: formData.isCollector.checked,
            SeriesId: selectedSeriesId,
            NbCarte: parseInt(formData.numberOfCards.value),
          };
          break;
        case 'Boite':
          product = {
            ...product,
            BoosterId: formData.boosterId.value,
            QtBoosters: parseInt(formData.quantityOfBoosters.value),
          };
          break;
        case 'Carte':
          const selectedSeriesCarte = series.find((serie) => serie.name === formData.seriesIdCarte.value);
          const selectedSeriesIdCarte = selectedSeriesCarte.seriesId;

          const selectedEtatCarte = etatCarte.find((etat) => etat.name === formData.etatCarteId.value);
          const selectedEtatCarteId = selectedEtatCarte.etatCarteId; 
          console.log(selectedEtatCarte)
          product = {
            ...product,
            SeriesId: selectedSeriesIdCarte,
            EtatCarteId: selectedEtatCarteId,
          };
          break;
        case 'Accessoires':
          const selectedTypeAcessoire = typeAcessoire.find((type) => type.name === formData.typeAcessoireId.value);
          const selectedTypeAcessoireId = selectedTypeAcessoire.typeAccessoiresId;
          product = {
            ...product,
            TypeAccessoiresId: selectedTypeAcessoireId,
          };
          break;
        default:
          console.error('Invalid product type');
          return;
      }
      console.log(JSON.stringify(product))
      const response = fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/${type}/${product.Id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${information.result.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
    
      response.then(response => {
        if (response.ok) {
          console.log('Product added successfully');
        } else {
          console.error('Failed to add product');
        }
        
      })
    }

    const onSubmitSupprimer = (event) => {
      event.preventDefault();
      const formData = event.target;
      const productId = parseInt(formData.id.value);
      const response = fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Article/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${information.result.token}`,
          'Content-Type': 'application/json'
        }
      });
    
      response.then(response => {
        if (response.ok) {
          console.log('Product removed successfully');
          setProduits(produits.filter(product => product.id !== productId));
        } else {
          console.error('Failed to remove product');
        }
        
      })
    };

    const handleCommandePreparer = (commandeId) => {
      event.preventDefault();
        const response = fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Commande/preparer/${commandeId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${information.result.token}`,
            'Content-Type': 'application/json'
          }
        });
      
        response.then(response => {
          if (response.ok) {
            console.log('Commande prepared successfully');
          } else {
            console.error('Failed to prepare commande');
          }
        })
      }
  

    const handleCommandeEnvoyer = (commandeId) => {
      event.preventDefault();
        const response = fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Commande/envoyer/${commandeId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${information.result.token}`,
            'Content-Type': 'application/json'
          }
        });
      
        response.then(response => {
          if (response.ok) {
            console.log('Commande sent successfully');
          } else {
            console.error('Failed to send commande');
          }
        })
      }
  
      const handleCommandeSupprimer = (commandeId) => {
        event.preventDefault();
        const response = fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Commande/${commandeId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${information.result.token}`,
            'Content-Type': 'application/json'
          }
        });
      
        response.then(response => {
          if (response.ok) {
            console.log('Commande removed successfully');
            setCommandes(commandes.filter(commande => commande.commandeId !== commandeId));
          } else {
            console.error('Failed to remove commande');
          }
        })
      }
   
    return (<>
      <Header />
      <div>
        <h1 className="text-center">Employe</h1>
        <div>
          <div className='container'>
            <h2>
              Liste des produits
              <button
                className="btn btn-primary"
                onClick={() => setShowProducts(!showProducts)}
              >
                {showProducts ? 'Cacher' : 'Afficher'}
              </button>
            </h2>
            {showProducts && (<>
              <div>
                <ListeAdmin produits={produits} onRemoveProduct={handleRemoveProduct} />
              </div>
              <div>
                <h3>Ajouter un produit</h3>
                <form id='ajoutForm' onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Nom du produit</label>
                    <input type="text" name='name' className="name form-control" placeholder="Nom du produit" />
                    <label className="form-label">Type du produit</label>
                    <select className="type form-select" name='type' aria-label="Default select example" onChange={handleTypeChange}>
                      <option value="Booster">Booster</option>
                      <option value="Boite">Boite</option>
                      <option value="Carte">Carte</option>
                      <option value="Accessoires">Accessoires</option>
                    </select>
                    <label className="form-label">Description du produit</label>
                    <input type="text" name='description' className="description form-control" placeholder="Description du produit" />
                    <label className="form-label">Prix du produit</label>
                    <input type="number" name='price' step="0.01" className="price form-control" placeholder="Prix du produit"/>
                    <label className="form-label">Nombre en Stock</label>
                    <input type="number" name='nbStock' step="0.01" className="price form-control" placeholder="Prix du produit"/>
                    {type === "Boite" && (
                      <div>
                        <label className="form-label">BoosterId</label>
                        <input type="text" name='boosterId' className="boosterId form-control" placeholder="BoosterId" />
                        <label className="form-label">Quantité de Boosters</label>
                        <input type="number" name='quantityOfBoosters' className="quantityBoosters form-control" placeholder="Quantity of Boosters" />
                      </div>
                    )}
                    {type === "Booster" && (
                      <div>
                        <label className="form-label">Est ce un booster collector?</label>
                        <input type="checkbox" name='isCollector' className="isCollector" />
                        <label className="form-label">SeriesID</label>
                        <select className="seriesIdBooster form-select" name='seriesIdBooster' aria-label="Default select example">
                          {series.map((serie,index) => (
                            <option key={index} data-value={serie.id}>{serie.name}</option>
                          ))}
                        </select>
                        <label className="form-label">Nombre de Cartes</label>
                        <input type="number" name='numberOfCards' className="numberOfCards form-control" placeholder="Number of Cards" />
                      </div>
                    )}
                    {type === "Carte" && (
                      <div>
                        <label className="form-label">Series de la carte</label>
                        <select className="seriesIdCarte form-select" name='seriesIdCarte' aria-label="Default select example">
                          {series.map((serie,index) => (
                            <option key={index} data-value={serie.id}>{serie.name}</option>
                          ))}
                        </select>
                        <label className="form-label">Etat de la Carte</label>
                        <select className="EtatCarteId form-select" name='etatCarteId' aria-label="Default select example">
                          {etatCarte.map((etatCart,index) => (
                            <option key={index} data-value={etatCart.id}>{etatCart.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    {type === "Accessoires" && (
                      <div>
                        <label className="form-label">TypeAccessoiresId</label>
                        <select className="EtatCarteId form-select" name='typeAccessoiresId' aria-label="Default select example">
                          {typeAcessoire.map((typeAcessoir,index) => (
                            <option key={index} data-value={typeAcessoir.id}>{typeAcessoir.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  <button className="btn btn-primary">Ajouter</button>
                </form>
              </div>  
              <div>
                <h3>Modifier un produit</h3>
                <form onSubmit={onSubmitModifier}>
                  <div className="mb-3">
                    <label className='form-label'>Id du produit</label>
                    <input type="number" name="id" className="id form-control" placeholder="Id du produit"/>
                    <label className="form-label">Nom du produit</label>
                    <input type="text" name='name' className="name form-control" placeholder="Nom du produit" />
                    <label className="form-label">Type du produit</label>
                    <select className="type form-select" name='type' aria-label="Default select example" onChange={handleTypeChange}>
                      <option value="Booster">Booster</option>
                      <option value="Boite">Boite</option>
                      <option value="Carte">Carte</option>
                      <option value="Accessoires">Accessoires</option>
                    </select>
                    <label className="form-label">Description du produit</label>
                    <input type="text" name='description' className="description form-control" placeholder="Description du produit" />
                    <label className="form-label">Prix du produit</label>
                    <input type="number" name='price' step="0.01" className="price form-control" placeholder="Prix du produit"/>
                    <label className="form-label">Nombre en Stock</label>
                    <input type="number" name='nbStock' step="0.01" className="price form-control" placeholder="Prix du produit"/>
                    {type === "Boite" && (
                      <div>
                        <label className="form-label">BoosterId</label>
                        <input type="text" name='boosterId' className="boosterId form-control" placeholder="BoosterId" />
                        <label className="form-label">Quantité de Boosters</label>
                        <input type="number" name='quantityOfBoosters' className="quantityBoosters form-control" placeholder="Quantity of Boosters" />
                      </div>
                    )}
                    {type === "Booster" && (
                      <div>
                        <label className="form-label">Est ce un booster collector?</label>
                        <input type="checkbox" name='isCollector' className="isCollector" />
                        <label className="form-label">SeriesID</label>
                        <select className="seriesIdBooster form-select" name='seriesIdBooster' aria-label="Default select example">
                          {series.map((serie,index) => (
                            <option key={index} data-value={serie.id}>{serie.name}</option>
                          ))}
                        </select>
                        <label className="form-label">Nombre de Cartes</label>
                        <input type="number" name='numberOfCards' className="numberOfCards form-control" placeholder="Number of Cards" />
                      </div>
                    )}
                    {type === "Carte" && (
                      <div>
                        <label className="form-label">Series de la carte</label>
                        <select className="seriesIdCarte form-select" name='seriesIdCarte' aria-label="Default select example">
                          {series.map((serie,index) => (
                            <option key={index} data-value={serie.id}>{serie.name}</option>
                          ))}
                        </select>
                        <label className="form-label">Etat de la Carte</label>
                        <select className="EtatCarteId form-select" name='etatCarteId' aria-label="Default select example">
                          {etatCarte.map((etatCart,index) => (
                            <option key={index} data-value={etatCart.id}>{etatCart.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    {type === "Accessoires" && (
                      <div>
                        <label className="form-label">TypeAccessoiresId</label>
                        <select className="EtatCarteId form-select" name='typeAccessoiresId' aria-label="Default select example">
                          {typeAcessoire.map((typeAcessoir,index) => (
                            <option key={index} data-value={typeAcessoir.id}>{typeAcessoir.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  <button className="btn btn-primary">Modifier</button>
                </form>
              </div>
              <div>
                <h3>Supprimer un produit</h3>
                <form onSubmit={onSubmitSupprimer}>
                  <div className="mb-3">
                    <label className='form-label'>Id du produit</label>
                    <input type="number" name="id" className="id form-control" placeholder="Id du produit"/>
                  </div>
                  <button className="btn btn-primary">Supprimer</button>
                </form>
                </div></>
            )}
          </div>
          <div className='container'>
            <h2>
              Liste des commandes
              <button
                className="btn btn-primary"
                onClick={() => setShowCommandes(!showCommandes)}
              >
                {showCommandes ? 'Cacher' : 'Afficher'}
              </button>
            </h2>
            {showCommandes && (
              <div>
                {Array.from({ length: commandes.length }).map((_, index) => (
                  commandes[index] && (
                    <CarteCommande key={index} commande={commandes[index]} handleCommandeEnvoyer={handleCommandeEnvoyer} handleCommandePreparer={handleCommandePreparer} handleCommandeSupprimer={handleCommandeSupprimer}/>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
      </>
    );
}