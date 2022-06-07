import express from "express";
import { MongoClient } from "mongodb";

const url = "mongodb+srv://ladeia:jana17@pets.y8xzvi8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "pets";

async function run() {
  try {
      await client.connect();
      console.log("Connected correctly to server");
      const db = client.db(dbName);
      const col = db.collection("petsToAdopt");
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

const app = express()
app.use(express.json())

app.get('/api', (req, res) => {
  res.status(200).json({message: 'GET /api route'})
})

app.post('/adocoes', (req, res) => {
  res.status(200).json(req.body)
})

app.listen(5000, () => console.log('Connected at port 5000, CTRL + C to exit'))
