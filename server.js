process.loadEnvFile()

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

// connecting the server with a DB
const mongoose = require("mongoose")
const MONGODB_URI = "mongodb://127.0.0.1:27017/artists-db"

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log("all good, connection to the DB stablished")
})
.catch((error) => {
  console.log(error)
})


// all middlewares & configurations here
app.use(logger("dev"));
app.use(express.static("public"));

// to allow CORS access from anywhere
app.use(cors({
  origin: '*'
}));

// below two configurations will help express routes at correctly receiving data. 
app.use(express.json()); // recognize an incoming Request Object as a JSON Object
app.use(express.urlencoded({ extended: false })); // recognize an incoming Request Object as a string or array


// all routes here...
app.get("/", (req, res, next) => {
  res.json({ message: "all good here!" })
})

// testing body/params/query
app.get("/test/:recipeId", (req, res) => {

  // console.log(req.body)
  // console.log(req.query)
  console.log(req.params)

  res.json({ message: "request received! all good" })
})

// CRUD OPERATIONS FOR ARTISTS
const Artist = require("./models/Artist.model")

// Creating an artists
app.post("/artist", (req, res) => {

  // example on backend validation, we will discuss this more on friday
  if (!req.body.name) {
    res.status(400).send("There is no name, this is mandatory")
  }

  // how do we receive data from the Client? req.body
  console.log(req.body)
  // how do we use that data to create a doc in the DB? Artist.create()
  Artist.create({
    name: req.body.name,
    awards: req.body.awards,
    isTouring: req.body.isTouring,
    genre: req.body.genre
  })
  .then(() => {
    // how do we handle a response to the client? res.json ALWAYS SEND A SINGLE RESPONSE TO THE CLIENT
  
    res.send("Document created, all good!")
  })
  .catch((error) => {
    console.log(error)
  })

})

// find all artists
app.get("/artist", (req, res) => {

  Artist.find({awards: {$gte: 20}})
  .select({name: 1, awards: 1})
  .sort({awards: 1})
  .then((response) => {
    console.log(response)
    res.json(response)
  })
  .catch((error) => {
    console.log(error)
  })

})

// delete artist
app.delete("/artist/:artistId", async(req, res) => {

  console.log(req.params)

  try {

    await Artist.findByIdAndDelete(req.params.artistId)
    res.send("document deleted")
    
  } catch (error) {
    console.log(error)
  }

})

// partial updating the band
app.patch("/artist/:artistId/awards", async(req, res) => {
  console.log(req.body)
  console.log(req.params)

  try {
    
    const response = await Artist.findByIdAndUpdate(req.params.artistId, {
      awards: req.body.awards
    }, {new: true})


    // the response we get from mongoose is the outdated document
    // we can force receiving the updated document by adding a config { new:true }
    res.json(response)

  } catch (error) {
    console.log(error)
  }

})

// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
