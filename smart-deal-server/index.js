const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config()
console.log(process.env)

const admin = require("firebase-admin");

// index.js
const decoded = Buffer.from(process.env.FB_SERVICE_KEY, "base64").toString("utf8");
const serviceAccount = JSON.parse(decoded);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


app.use(cors())
app.use(express.json())



// middleware for client protection
const logger = (req,res,next) => {
    console.log("logging info")
    next();
}

const verifyFireBaseToken = async(req,res,next) => {
    // console.log(req.headers.authorization)
    if(!req.headers.authorization){
        return res.status(401).send({messsage: "unauthorized access1"})
    }
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).send({messsage: "unauthorized access2"});
    }
    try{
        const userInfo = await admin.auth().verifyIdToken(token);
        req.token_email = userInfo.email;
        console.log("after token validation: ",userInfo);
        next();
    }
    catch{
        console.log('error')
        return res.status(401).send({messsage: "unauthorized access3"});
    }
}

// jwt token
const verifyJWTToken = async(req,res,next) => {
    console.log('in the middleware jwt:',req.headers.authorization)
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).send({messsage: "unauthorized access1"})
    }
    const token = authorization.split(' ')[1];
    if(!token){
        return res.status(401).send({messsage: "unauthorized access2"})
    }
    jwt.verify(token,process.env.JWT_SECRET,(error,decoded)=>{
        if(error){
            return res.status(401).send({messsage: "unauthorized access2"})
        }
        console.log("after decoded:",decoded)
        req.token_email = decoded.email;
        next();
    })
}

// require('dotenv').config()
// console.log(process.env)

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
    app.get('/bids',verifyJWTToken, async(req,res)=>{
        // console.log('headers:',req.headers)
        const email = req.query.email;
        const query = {};
        if(email){
            query.buyer_email = email;
        }
        if(email !== req.token_email){
            return res.status(401).send({messsage: "forbidden access3"});
        }
        const cursor = bidsCollection.find(query);
        const result = await cursor.toArray();
        res.send(result)
    })

    // with firebase login verify
    // app.get('/bids',logger,verifyFireBaseToken, async(req,res)=> {
    //     // console.log("token: ",req.headers)
    //     const email = req.query.email;
    //     const query = {};
    //     if(email){
    //         if(email !== req.token_email){
    //             return res.status(403).send({messsage: "forbidden access3"});
    //         }
    //         query.buyer_email = email;
    //     }
    //     const cursor = bidsCollection.find(query);
    //     const result = await cursor.toArray();
    //     res.send(result);
    // })

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

    ////// FOR JWT TOKEN API
    app.post('/getToken',(req,res) => {
        const loggedUser = req.body;
        const token = jwt.sign(loggedUser,process.env.JWT_SECRET,{expiresIn: '1h'});
        res.send({token :token});
    }) 
    
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// app.listen(port,()=>{
//     console.log(`smart deal  server is listening on port: ${port}`)
// })

module.exports = app;