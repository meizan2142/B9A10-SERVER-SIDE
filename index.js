const express = require('express');
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.usv0l7z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const touristSpotCollection = client.db('spotDB').collection('touristSpot')
        app.post('/touristspotinfo', async(req, res) => {
            console.log(req.body);
            const newSpot = req.body;
            console.log(newSpot);
            const result = await touristSpotCollection.insertOne(newSpot)
            res.send(result)
        })
    } finally {
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Working')
})

app.listen(port, () => {
    console.log(`We are running on: ${port}`);
})