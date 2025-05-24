


async function loadIndexeDB() {
    var requete = indexedDB.open("DBLePDC", 1);
    var bd;
    
var PDCStorage;

    return new Promise((resolve, reject) => {
        requete.onsuccess = function (event) {
            console.log("Database opened successfully");
            bd = event.target.result;
            PDCStorage = bd.transaction("sessionStorage", "readwrite").objectStore("sessionStorage");
            resolve(PDCStorage);
        }

        requete.onupgradeneeded = function (event) {
            bd = event.target.result;
            if (event.oldVersion < event.newVersion) {
        
                var options = {
                    keyPath: "id",
                    autoIncrement: true,
                };
                PDCStorage = bd.createObjectStore("sessionStorage", options);
            
                PDCStorage.createIndex("Index", "id");
            }
        }
    })
    return bd
}

export const bd = loadIndexeDB()
  

