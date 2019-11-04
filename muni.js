require('es6-promise').polyfill();
require('isomorphic-fetch');

import { stops } from './stops.js'
const dev = false
let init = false

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, Accept, Content-Type'
  )

  getStopDataNextbus()
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((error) => {
      res.status(400).send(error)
    })
}

// make request to get data
const getStopDataNextbus = async () => {
  let jsonResponseArr = []
  for await (let stop of stops) {
    const rawResponse = await fetch(
      `http://webservices.nextbus.com/service/publicJSONFeed?command=predictions&a=${stop.agency}&stopId=${stop.id}`, { mode: 'no-cors' }
    )
    const jsonResponse = await rawResponse.json()
    jsonResponseArr.push(jsonResponse.predictions)
  }
  return Promise.all(jsonResponseArr)
}
