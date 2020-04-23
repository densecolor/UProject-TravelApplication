// Express to run server and routes
const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const HTTP = require('./http')
const API = require('./apiconfig')
const countries = require('./countries')

// Start up an instance of app
const app = express()

/* Dependencies */
dotenv.config()

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('dist'))

// Spin up the server
const port = 3000
app.listen(port, listening)

// Callback to debug
function listening() {
  console.log(`Server running on localhost:${port}`)
}

// Get Route
app.get('/api/country/info', function (req, res) {
  res.send(countries)
})

// Post Routes
app.post('/api/geo/info', async function (req, res) {
  const geoInfo = await getGeoInfo(req.body)
  res.send(geoInfo)
})

app.post('/api/weather/info', async function (req, res) {
  const weatherInfo = await getWeatherInfo(req.body)
  res.send(weatherInfo)
})

app.post('/api/image/info', async function (req, res) {
  const imageInfo = await getImageInfo(req.body)
  res.send(imageInfo)
})

/**
 * Search geo info use destination & country
 * @param {*} destination 
 * @param {*} countryCode
 */
async function getGeoInfo({ destination = 'paris', countryCode = 'FR' }) {
  const params = {
    'placename_startsWith': destination,
    countryCode: countryCode,
    maxRows: 1,
    username: process.env.GEONAMES_USERNAME
  }
  const res = await HTTP.get(API.geonames, params)
  return res.postalCodes
}

/**
 * Fetch weather info use geo info
 * @param {*} param
 */
async function getWeatherInfo({ lat, lng, days, postalCode }) {
  const params = {
    lat,
    lon: lng,
    days,
    key: process.env.WEATHERBIT_KEY
  }
  let res = {}
  try {
    res = await HTTP.get(API.weatherbit, params)
  } catch (error) {
    console.log('something went wrong with begin date, and end date')
  }
  return res.data[0]
}

/**
 * Fetch image info use city name
 * @param {*} param
 */
async function getImageInfo({ city }) {
  let imageInfo = {}
  const params = {
    q: `${city}+travel`,
    'image_type': 'photo',
    key: process.env.PIXABAY_KEY
  }

  try {
    imageInfo = await HTTP.get(API.pixabay, params)
  } catch (error) {
    console.log(error)
  }
  
  return imageInfo
}

module.exports = app
