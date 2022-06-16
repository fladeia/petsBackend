import 'dotenv/config'
import express from "express";
import cors from 'cors'
import { MongoClient } from "mongodb";

const url = process.env.MONGO_URL
const PORT = process.env.PORT || 8000
const client = new MongoClient(url);

const app = express()

app.use(cors())
app.use(express.json({}))

app.get('/', (req, res) => {
  res.json({message: "Home page 2"})
})

// app.get('/api/pets', async function getPets(req, res) {
//   try {
//       await client.connect();

//       const database = client.db('pets');
//       const petsToAdopt = database.collection("petsToAdopt");
//       const query = {};

//       const options = {
//         sort: { "petName": 1 },
//         projection: { _id: 1, petName: 1, history: 1, urlPhoto: 1 },
//       };

//       const cursor = petsToAdopt.find(query, options);
//       const result = await cursor.toArray();

//       res.status(200).json({result})
//   } catch (err) {
//       console.log(err.stack);
//   }
//   finally {
//       await client.close();
//   }
// })

app.listen(PORT, () => console.log('Connected at port 5000, CTRL + C to exit'))
