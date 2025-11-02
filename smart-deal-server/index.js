const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

require('dotenv').config()
console.log(process.env)

// sNxCmYNFHcNbw2Vp
// smart-deal-user
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gafegcj.mongodb.net/?appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/',(req,res)=> {
    res.send('smart deal server connected')
})


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db('smart_db');
    const productsCollection = db.collection('products');
    const bidsCollection = db.collection('bids');
    const usersCollection = db.collection('users');

    ///// FOR PRODUCTS API ///////
    app.post('/products',async(req,res)=> {
        const newProduct = req.body;
        const result = await productsCollection.insertOne(newProduct)
        res.send(result);
    })

    app.delete('/products/:id',async(req,res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await productsCollection.deleteOne(query)
        res.send(result)
    })

    app.patch('/products/:id',async(req,res)=> {
        const id = req.params.id;
        const updateProduct = req.body;
        const query = {_id: new ObjectId(id)};
        const update = {
            $set : {
                name: updateProduct.name,
                price: updateProduct.price,
            }

        }
        const  result = await productsCollection.updateOne(query,update)
        res.send(result)
    })

    // find all for email
    app.get('/products',async(req,res)=> {
        const email = req.query.email;
        const query = {};
        if(email){
            query.email = email;
        }
        // console.log(email)
        const cursor = productsCollection.find(query);
        // const cursor = productsCollection.find().sort({price_min: -1});
        // const cursor = productsCollection.find().limit(5);
        // const cursor = productsCollection.find().skip(20);
        // const cursor = productsCollection.find().project({title: 1,email: 1});

        const result = await cursor.toArray();
        res.send(result)
    })

    // find latest products
    app.get('/latestproducts',async(req,res)=>{
        const cursor = productsCollection.find().sort({created_at: -1}).limit(6);
        const result = await cursor.toArray();
        res.send(result);
    })
    // find single
    app.get('/products/:id',async(req,res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await productsCollection.findOne(query);
        res.send(result)
    })

    //// FOR BIDS DATA API /////
    app.get('/bids', async(req,res)=> {
        const email = req.query.email;
        const query = {};
        if(email){
            query.buyer_email = email;
        }
        const cursor = bidsCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/products/bids/:productId',async(req,res)=>{
        const productId = req.params.productId;
        const query =  {product: productId};
        const cursor = bidsCollection.find(query).sort({bid_price: -1});
        const result = await cursor.toArray();
        res.send(result)
    })

    app.post('/bids',async(req,res)=> {
        const newBids = req.body;
        const result = await bidsCollection.insertOne(newBids);
        res.send(result);
    })

    app.delete('/bids/:id',async(req,res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await bidsCollection.deleteOne(query);
        res.send(result)
    })

    ///// FOR USERS API //////
    app.post('/users',async(req,res)=>{
        const newUser = req.body;
        const email = req.body.email;
        const query = {email: email}
        const presentUser = await usersCollection.findOne(query);
        if(presentUser){
            res.send('user already exists')
        }
        else{

            const result = await usersCollection.insertOne(newUser);
            res.send(result)
        }
    })
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port,()=>{
    console.log(`smart deal  server is listening on port: ${port}`)
})