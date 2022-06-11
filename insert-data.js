import { MongoClient } from "mongodb";
 
const url = "mongodb+srv://ladeia:jana17@pets.y8xzvi8.mongodb.net/?retryWrites=true&w=majoritye";
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "pets";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection("petsToAdopt");

         // Construct a document                                                                                                                                                              
         let petDocument = {
            "name": "Dolby",
            "history": "lorem ipson",                                                                                                                                
            "photo": "http://image.com"
         }

         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(petDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);
