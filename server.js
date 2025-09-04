process.loadEnvFile()

const express = require("express");
const app = express();

require("./db")
// this will find a file called index inside the folder and execute it

// all middlewares & configurations here
const config = require("./config")
config(app)

// all routes here...
const indexRouter = require("./routes/index.routes")
app.use("/api", indexRouter)

// handle error messages
const handleErrors = require("./error-handlers")
handleErrors(app)

// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
