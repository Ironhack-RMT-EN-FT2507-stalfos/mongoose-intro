const mongoose = require("mongoose")

// schema
const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  awards: {
    type: Number,
    min: 0
  },
  isTouring: Boolean,
  genre: {
    type: [ String ], // an array of strings
    enum: [ "rock", "alternative", "jazz", "pop", "indie", "punk" ]
  }
})

// model
const Artist = mongoose.model("Artist", artistSchema)
// argument 1: the internal name of the model. Always singular and Pascal Casing.

module.exports = Artist