'use client'
import 'bootstrap/dist/css/bootstrap.css';
import FormEvent  from "react"
import { useRouter } from "next/navigation"
import { sessionStorage } from "../dbacces/sessionStorage.js"
import React from "react"
import "../css/connexion.css"

export default function Connexion() {
  const router = useRouter()
    const [error, setError] = React.useState(null);

  async function handleSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    console.log(username, password)
    try {
      const response = await fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Accounts/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Username: username,
          Password: password
        })
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const role = data.role;
        const sessionData = {
          id : 1,
          username : username,
          token : token,
          role :  role
        }
        await sessionStorage.set(sessionData)
        router.push(`../profil/${username}`)
      } else{
        setError("Identifiant ou mot de passe incorrect")
      }
    } catch (error) {
      setError("Erreur de connexion : " + error.message)
    }
  }
  
  /*//json-server
  export default function Connexion() {
    const router = useRouter();
    const [error, setError] = React.useState(null);
  
    async function handleSubmit(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const username = formData.get("username");
      const password = formData.get("password");
  
      try {
        const response = await fetch(`http://localhost:3001/utilisateurs`);
        if (!response.ok) throw new Error("Erreur lors de la requête.");
  
        const users = await response.json();
  
        const user = users.find(
          (u) => u.name === username && u.password === password
        );
  
        if (user) {
          const sessionData = {
            id: user.id,
            username: user.name,
            token: "fake-jwt-token", // json-server doesn't generate real tokens
            role: "user", // Add a role if needed, or store it in db.json
          };
  
          await sessionStorage.set(sessionData)
          router.push(`/profil/${username}`);
        } else {
          setError("Identifiant ou mot de passe incorrect");
        }
      } catch (error) {
        setError("Erreur de connexion : " + error.message);
      }
    }*/
  
    return(<>
    <div className='cs-connexion-div'>
      <div className="cs-inner-connexion-div">
        <h1 className="text-center">Connexion</h1>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                { error !== null && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                    <label htmlFor="username" className="col-form-label">Username:</label>
                    <input type="text" id="username" name="username" required className="form-control" />
                    <div className="invalid-feedback" id="username-error"></div>
                    </div>

                    <div className="form-group">
                    <label htmlFor="password" className="col-form-label">Password:</label>
                    <input type="password" id="password" name="password" required className="form-control" />
                    <div className="invalid-feedback" id="password-error"></div>
                    </div>

                    <div className="cs-connexion-btn-login-div">
                      <button type="submit" className="btn btn-primary">Login</button>
                      <a href="../inscription">Pas de compte? S'inscrire ici</a>
                    </div>
                </form>
                </div>
            </div>
        </div>
      </div>
    </div>
    </>)
}