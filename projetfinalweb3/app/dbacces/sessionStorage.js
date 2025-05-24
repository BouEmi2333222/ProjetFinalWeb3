import { bd } from "./setupIndexeDB";

const sessionStorage = {
    async get() {
        const db = await bd;
        const transaction = db.transaction(["sessionStorage"], "readonly")
        const sessionStore = await transaction.objectStore("sessionStorage")
        const session = await sessionStore.get(1)
        return session
    },

    async set(sessionData){
        const db = await bd;
        console.log(db)
        const transaction = db.transaction(["sessionStorage"], "readwrite");
        const sessionStore = await transaction.objectStore("sessionStorage")
        sessionStore.put({
            id : sessionData.id,
            username : sessionData.username,
            token : sessionData.token
        });
    },

    async delete(){
        const db = await bd;
        const transaction = db.transaction(["sessionStorage"], "readwrite");
        await transaction.objectStore("sessionStorage").delete(1);
    }
}

export {sessionStorage}