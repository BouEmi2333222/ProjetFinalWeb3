import Localbase from 'localbase'

let db = new Localbase('db')

const panierStorage = {
    async addProduit(produit) {
        await db.collection('panier').add(produit);
        
    },
    
    async getAllProduit(event) {
        event.preventDefault();
        const people = await db.collection('panier').get();
        return people;
    },

    async removeProduit(event,produit) {
        await db.collection('panier').doc({ id: produit.id }).delete();
    }
}

export { panierStorage }