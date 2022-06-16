import 'dotenv/config'
import { MongoClient } from "mongodb";
const url = process.env.MONGO_URL
const client = new MongoClient(url);

async function getPets(req, res) {
  try {
      await client.connect();

      const database = client.db('pets');
      const petsToAdopt = database.collection("petsToAdopt");
      const query = {};

      const options = {
        sort: { "petName": 1 },
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

async function insertPet(req, res) {
  try {
    await client.connect();

    const database = client.db('pets');
    const petsToAdopt = database.collection("petsToAdopt");
    const doc = req.body
    const result = await petsToAdopt.insertOne(doc);

    res.status(200).send(`Pet cadastrado com sucesso, id: ${result.insertedId}`);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

async function getAdoptedPets(req, res) {
  try {
      await client.connect();

      const database = client.db('pets');
      const adoptedPet = database.collection("adoptedPet");
      const query = {};

      const options = {
        sort: { "petName": 1 },
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

async function adoptPet(req, res) {
  try {
    await client.connect();

    const database = client.db('pets');
    const adoptedPet = database.collection("adoptedPet");
    const doc = req.body
    const result = await adoptedPet.insertOne(doc);

    res.status(200).send(`Pet adotado com sucesso _id: ${result.insertedId}`);
  } catch (err) {
    console.log(err);
  }
    finally {
      await client.close();
  }
}

export  {
  getPets,
  insertPet,
  getAdoptedPets,
  adoptPet
}