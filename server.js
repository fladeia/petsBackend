import express from "express";
import { MongoClient } from "mongodb";

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
        sort: { "name": -1 },
        // Include only the `name`, `history` and `photo` fields in the returned document
        projection: { _id: 0, name: 1, history: 1, photo: 1 },
      };

      const petsList = await petsToAdopt.findOne(query, options);

      // since this method returns the matched document, not a cursor, print it directly
      console.log(petsList);

      res.status(200).json(petsList)

  } catch (err) {
      console.log(err.stack);
  }
  finally {
      await client.close();
  }
}
// getPets().catch(console.dir);

const app = express()
  app.use(express.json({}))

app.get('/api/pets', getPets)

app.post('/api/adocoes', (req, res) => {
  res.status(200).json({})
})

app.listen(PORT, () => console.log('Connected at port 5000, CTRL + C to exit'))
