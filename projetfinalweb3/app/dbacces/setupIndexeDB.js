


async function loadIndexeDB() {
    var requete = indexedDB.open("DBLePDC", 1);
    var bd;
    
    var PDCStorage;

    return new Promise((resolve, reject) => {
        requete.onsuccess = function (event) {
            console.log("Database opened successfully");
            bd = event.target.result;
            const PDCStorage = bd.transaction("sessionStorage", "readwrite").objectStore("sessionStorage");
            resolve(bd);
        }

        requete.onupgradeneeded = function (event) {
            bd = event.target.result;
            if (event.oldVersion < event.newVersion) {
        
                var options = {
                    keyPath: "id",
                    autoIncrement: true,
                };
                const PDCStorage = bd.createObjectStore("sessionStorage", options);
            
                PDCStorage.createIndex("Index", "id");
            }
        }
    })
}


export {loadIndexeDB}

