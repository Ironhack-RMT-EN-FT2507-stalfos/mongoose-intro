// connecting the server with a DB
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("all good, connection to the DB stablished")
})
.catch((error) => {
  console.log(error)
})