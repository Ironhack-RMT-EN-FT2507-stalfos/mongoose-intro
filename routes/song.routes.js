const express = require("express")
const router = express.Router()

//* CRUD OPERATIONS FOR SONGS
const Song = require("../models/Song.model")

// Creating a song
router.post("/", async(req, res, next) => {

  console.log(req.body)

  try {
    
    await Song.create({
      title: req.body.title,
      releaseDate: req.body.releaseDate,
      artist: req.body.artist,
      collaboratingArtists: req.body.collaboratingArtists
    })

    res.sendStatus(201)

  } catch (error) {
    next(error)
  }

})

// Checking the details of a single song
router.get("/:songId", async (req, res, next) => {

  try {

    // console.log(potato)
    
    const response = await Song
    .findById(req.params.songId)
    .populate({
      path: "artist",
      select: {name: 1, awards: 1, favArtist: 1},
      populate: {
        path: "favArtist",
        model: "Artist",
        populate: {
          path: "favArtist",
          model: "Artist"
        }
      }
    }) // always the name of the property that has a relation id
    .populate({
      path: "collaboratingArtists",
      select: {name: 1}
    })
    
    // populates also apply for .find methods when there are multiple elements

    res.status(200).json(response)

  } catch (error) {
    // next() // if we don't pass any arguments it means, move to the next route
    next(error) // if we pass a single argument it means, move to the 500 error handler
  }

})

module.exports = router