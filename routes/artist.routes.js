const express = require("express")
const router = express.Router()

//* CRUD OPERATIONS FOR ARTISTS
const Artist = require("../models/Artist.model")

// Creating an artists
router.post("/", (req, res, next) => {

  // example on backend validation, we will discuss this more on friday
  if (!req.body.name) {
    res.status(400).json({errorMessage: "There is no name, this is mandatory"})
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
  
    res.sendStatus(201)
    //.status() means that a status code will acompany the response
    //.sendStaus() means that you are just sending the status code
  })
  .catch((error) => {
    next(error)
  })

})

// find all artists
router.get("/", (req, res, next) => {

  Artist.find({awards: {$gte: 20}})
  .select({name: 1, awards: 1})
  .sort({awards: 1})
  .then((response) => {
    console.log(response)
    res.status(200).json(response)
  })
  .catch((error) => {
    next(error)
  })

})

// delete artist
router.delete("/:artistId", async(req, res, next) => {

  console.log(req.params)

  try {

    await Artist.findByIdAndDelete(req.params.artistId)
    res.sendStatus(202)
    
  } catch (error) {
    next(error)
  }

})

// partial updating the band
router.patch("/:artistId/awards", async(req, res, next) => {
  console.log(req.body)
  console.log(req.params)

  try {
    
    const response = await Artist.findByIdAndUpdate(req.params.artistId, {
      awards: req.body.awards
    }, {new: true})


    // the response we get from mongoose is the outdated document
    // we can force receiving the updated document by adding a config { new:true }
    res.status(202).json(response)

  } catch (error) {
    next(error)
  }

})

module.exports = router