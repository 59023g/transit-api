module.exports = ( req, res ) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, Accept, Content-Type'
  )
  res.status(200).send({
    "reload": false
  })
}
