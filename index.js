// Add Express
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");

async function main() {
  // Initialize Express
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  // const uri = process.env["MONGODB_URI"];
  const uri =
    "mongodb+srv://anuragrao:super-secure-password@get-cookbook-cluster.bezotsr.mongodb.net/?retryWrites=true&w=majority";
  async function connect_to_db() {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    const dbName = "get-cookbook-cluster";
    const collectionName = "recipes";

    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    return [database, collection];
  }

  const [database, collection] = await connect_to_db();

  app.post("/make_a_recipe", async (req, res) => {
    const recipe = req.body;
    try {
      const result = await collection.insertOne(recipe);
      res.sendStatus(200); // 200 OK
    } catch (e) {
      res.sendStatus(500); // 500 internal server error
      console.log(e);
    }
  });

  app.get("/get_all_recipes", async (req, res) => {
    try {
      const result = await collection.find({}).toArray();
      res.json(result);
    } catch (e) {
      res.sendStatus(500);
      console.log(e);
    }
  });

  // On GET request
  app.get("/", (req, res) => {
    res.send("{ message: 'Hello World!' }");
  });

  // Initialize server
  app.listen(5000, () => {
    console.log("Running on port 5000.");
  });

  // export it so that it can be recognised by vercel's serverless function
  module.exports = app;
}

main().catch(console.error);
module.exports = main;
