
const express = require("express")
const router = express.Router()

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "all good here!" })
})

// testing body/params/query
router.get("/test/:recipeId", (req, res) => {

  // console.log(req.body)
  // console.log(req.query)
  console.log(req.params)

  res.status(200).json({ message: "request received! all good" })
})

const artistRouter = require("./artist.routes")
router.use("/artist", artistRouter)

const songRouter = require("./song.routes")
router.use("/song", songRouter)

module.exports = router