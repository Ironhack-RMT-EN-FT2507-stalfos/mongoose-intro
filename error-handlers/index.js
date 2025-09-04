
function handleErrors(app) {

  // 404
  app.use((req, res) => {
    res.status(404).json({errorMessage: "API Route not found"})
  })

  // 500
  app.use((error, req, res, next) => {
    // the way express knows this is a 500 error handler is because it is receiving exactly 4 parameters.
    console.log(error)
    res.status(500).json({errorMessage: "Some weird error happened on the Server"})
  })

}

module.exports = handleErrors