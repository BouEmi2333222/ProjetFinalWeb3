import Header from "../reactComponents/Header.js"
import 'bootstrap/dist/css/bootstrap.css';
import Footer from "../reactComponents/Footer";
import React from "react"

export default function Inscription() {
    async function handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');
        const email = formData.get('email');
        console.log(username, password, email)
        try {
            const response = await fetch(`https://projet-prog4e04.cegepjonquiere.ca:443/api/Accounts/register-client`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Username: username,
                    Password: password,
                    Email: email
                })
            });
            if (response.ok) {
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
                      const sessionData = {
                        id : 1,
                        username : username,
                        token : token
                      }
                      await sessionStorage.set(sessionData)
                      router.push(`../profil/${username}`)
                    } else{
                      setError("Identifiant ou mot de passe incorrect")
                    }
                  } catch (error) {
                    setError("Erreur de connexion : " + error.message)
                  }
            } else{
                setError("Identifiant ou mot de passe incorrect")
            }
        } catch (error) {
            setError("Erreur de connexion : " + error.message)
        }
      }
    return(<>
    <Header/>
    <h1 className="text-center">Inscription</h1>
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6">
            <form>
                <div className="form-group">
                <label for="username" className="col-form-label">Username:</label>
                <input type="text" id="username" name="username" required minlength="3" className="form-control" />
                <div className="invalid-feedback" id="username-error"></div>
                </div>

                <div className="form-group">
                <label htmlFor="email" className="col-form-label">Email:</label>
                <input type="email" id="email" name="email" required className="form-control" />
                <div className="invalid-feedback" id="email-error"></div>
                </div>

                <div className="form-group">
                <label htmlFor="password" className="col-form-label">Password:</label>
                <input type="password" id="password" name="password" required className="form-control" />
                <div className="invalid-feedback" id="password-error"></div>
                </div>

                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <a href="/connexion">Déjà un compte? Se connecter ici</a>
            </div>
        </div>
    </div>
    <Footer/></>)
}