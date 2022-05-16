export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}

// indexedDb helper function
export function idbPromise(storeName, method, object) {
  return new Promise((resolve,reject) => {
     // open connection to the database `shop shop` with the version of 1
     const request = window.indexedDB.open('shop-shop', 1);

     // create variables to hold reference to the database, transaction (tx), and the object store
     let db, tx, store;

     // if verion has changed (or if this is the first time using the database), run this method and create the three object stores

     request.onupgradeneeded = function(e) {
       const db = request.result;

       // create object store for each type of data and set "primary" key index to be the `_id` of the data
       db.createObjectStore('products', { keyPath: '_id' });
       db.createObjectStore('categories', { keyPath: '_id' });
       db.createObjectStore('cart', { keyPath: '_id' });
     };

     // handle any errors with connecting
     request.onerror = function(e) {
       console.log('there was an error!');
     };
     // on database open success

     request.onsuccess = function(e) {
       // save a referrence of the database to the `db` variable
       db = request.result;
       // open a transaction do whatever we pass into `storename` (must match one of the object store names)
       tx = db.transaction(storeName, 'readwrite');
       // save a reference to that object store
       store = tx.objectStore(storeName);

       // if theres any errors let us know
       db.onerror = function(e) {
         console.log('error',e);
       }

       // both put and get methods will return data to wherever this function idbPromise() is called
      switch(method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;

        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;  

        case 'delete':
          store.delete(object._id);
          
          break;

          default:
            console.log('No valid method');

            break;
      }

       // when the transaction is complete, close the connection
       tx.oncomplete = function() {
         db.close();
       };
     }
  });
}