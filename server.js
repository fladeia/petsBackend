import express from "express";
import cors from 'cors'
import { MongoClient } from "mongodb";

const app = express()
app.use(cors())
app.use(express.json({}))

const PORT = 5000
const url = "mongodb+srv://ladeia:jana17@pets.y8xzvi8.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);

async function getPets(req, res) {
  try {
      //Connect
      await client.connect();
      console.log("Connected correctly to server");

      //Database and collections name
      const database = client.db('pets');
      const petsToAdopt = database.collection("petsToAdopt");

      // Query for a movie that has the title 'The Room'
      // const query = { title: "The Room" };

      // Query for all documents
      // if you provide an empty document, MongoDB matches all documents in the collection.
      const query = {};

      const options = {
        // sort matched documents in descending order by name
        sort: { "petName": 1 },
        // Include only the `petName`, `history` and `urlPhoto` fields in the returned document
        projection: { _id: 1, petName: 1, history: 1, urlPhoto: 1 },
      };

      const cursor = petsToAdopt.find(query, options);
      const result = await cursor.toArray();

      res.status(200).json({result})
  } catch (err) {
      console.log(err.stack);
  }
  finally {
      await client.close();
  }
}

async function getAdoptedPets(req, res) {
  try {
      //Connect
      await client.connect();
      console.log("Connected correctly to server");

      //Database and collections name
      const database = client.db('pets');
      const adoptedPet = database.collection("adoptedPet");

      // Query for all documents
      // if you provide an empty document, MongoDB matches all documents in the collection.
      const query = {};

      const options = {
        // sort matched documents in descending order by name
        sort: { "petName": 1 },
        // Include only the `petName`, `history` and `urlPhoto` fields in the returned document
        projection: { _id: 0, pet_id: 1, email: 1, amount: 1 },
      };

      const cursor = adoptedPet.find(query, options);
      const result = await cursor.toArray();

      res.status(200).json({result})
  } catch (err) {
      console.log(err.stack);
  }
  finally {
      await client.close();
  }
}

async function insertPet(req, res) {
  try {
    await client.connect();

    //Database and collections name
    const database = client.db('pets');
    const petsToAdopt = database.collection("petsToAdopt");

    const doc = req.body

    const result = await petsToAdopt.insertOne(doc);

    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.status(200).send(`Pet cadastrado com sucesso`);
  } finally {
    await client.close();
  }
}

async function adoptPet(req, res) {
  try {
    await client.connect();

    //Database and collections name
    const database = client.db('pets');
    const adoptedPet = database.collection("adoptedPet");

    const doc = req.body

    const result = await adoptedPet.insertOne(doc);

    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.status(200).send('Pet adotado com sucesso');
  } finally {
    await client.close();
  }
}

// Routes
app.get('/api/pets', getPets)
app.post('/api/pets', insertPet)
app.get('/api/adopt', getAdoptedPets)
app.post('/api/adopt', adoptPet)

app.listen(PORT, () => console.log('Connected at port 5000, CTRL + C to exit'))
