const express = require('express')
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const { query } = require('express');
const port = process.env.port || 1000;



app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Portfolio server is running')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@myportfolio.ifyk5nv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {

    const categoryCollection = client.db('myPortfolio').collection('category');
    const projectCollection = client.db('myPortfolio').collection('projects');

    try {

        // Get Category=======================
        app.get('/categories', async (req, res) => {
            const query = {};
            const cursor = categoryCollection.find(query);
            const categories = await cursor.toArray();
            res.send(categories);
        })

        // Get Products by category=======================
        app.get('/projects', async (req, res) => {
            const category = req.query.category;
            let query = {};
            if (category) {
                query = { category: category }
            }
            const cursor = projectCollection.find(query);

            const projects = await cursor.toArray();
            res.send(projects);
        });

    }

    finally {

    }
}

run().catch(err => console.error(err));

app.listen(port, () => {
    console.log(`Server is running in port number ${port}`);
})