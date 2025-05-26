import { loadIndexeDB } from "./setupIndexeDB";
import Router from "next/router";

const sessionStorage = {
    async get() {
        const db = await loadIndexeDB();
        const transaction = db.transaction(["sessionStorage"], "readonly")
        const sessionStore = await transaction.objectStore("sessionStorage")
        const session = await sessionStore.get(1)
        return session
    },

    async set(sessionData){
        const db = await loadIndexeDB();
        console.log(db)
        const transaction = db.transaction(["sessionStorage"], "readwrite");
        const sessionStore = await transaction.objectStore("sessionStorage")
        sessionStore.put({
            id : sessionData.id,
            username : sessionData.username,
            token : sessionData.token,
            role : sessionData.role
        });
    },

    async delete(){
        const db = await loadIndexeDB();
        const transaction = db.transaction(["sessionStorage"], "readwrite");
        await transaction.objectStore("sessionStorage").delete(1);
    }
}

export {sessionStorage}