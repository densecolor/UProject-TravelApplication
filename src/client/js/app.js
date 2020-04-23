import dayjs from 'dayjs'
import HTTP from '../utils/http'
import API from '../apiconfig'
import getRelativeDate from '../utils/relativeDate'

let duration = 0

const fetchCityPhoto = async () => {
  let photoes = {}
  const cities = ['paris', 'tokyo', 'turkey']
  const randomCity = sample(cities)
  const res = await HTTP.post(API.getImageInfo, {
    city: randomCity
  })
  if (res && res.total > 0) {
    photoes = sample(res.hits)
  }
  return photoes
}

const fetchCountries = async () => {
  const res = await HTTP.get(API.getCountryInfo)
  return res
}

const sample = arr => arr[Math.floor(Math.random() * arr.length)]

const handleSubmit = async (event) => {
  event.preventDefault()

  let formDestination = document.getElementById('grid-city').value
  let formCountry = document.getElementById('grid-country').value
  let formBeginDate = document.getElementById('grid-begin-date').value
  let formEndDate = document.getElementById('grid-end-date').value

  console.log("::: city :::", formDestination)
  console.log("::: country :::", formCountry)
  console.log("::: begin date :::", formBeginDate)
  console.log("::: end date :::", formEndDate)

  const countDownDays = getRelativeDate(formBeginDate)
  const startDate = dayjs(formBeginDate).format('YYYY-MM-DD')
  const endDate = dayjs(formEndDate).format('YYYY-MM-DD')
  duration = dayjs(formEndDate).diff(dayjs(formBeginDate), 'day')

  // fetch geo info first
  const geoInfo = await HTTP.post(API.getGeoInfo, {
    destination: formDestination,
    countryCode: formCountry
  })
  const { lat, lng, postalCode } = geoInfo[0]

  // fetch weather info use geo info { lat, lng, startDate, endDate, postalCode }
  const weatherInfo = await HTTP.post(API.getWeatherInfo, {
    lat,
    lng,
    days: countDownDays,
    postalCode
  })

  console.log(weatherInfo)

  const imageInfo = await HTTP.post(API.getImageInfo, {
    city: formDestination
  })

  const photo = sample(imageInfo.hits)
  console.log(photo)

  // render UI
  renderUI({
    destination: formDestination,
    countDownDays,
    weatherInfo,
    photo
  })
}

/**
 * Begin Render UI use useful infomation
 * @param {*} param
 */
const renderUI = (travelInfo) => {
  const {
    destination,
    weatherInfo,
    countDownDays,
    photo
  } = travelInfo
  document.getElementById('travel-card').classList.remove('hidden')
  document.getElementById('travel-card').classList.add('flex')
  document.getElementById('travel-timesago').innerHTML = `Days until trip to ${destination}: ${countDownDays} days`,
  document.getElementById('travel-duration').innerHTML = `Your trip duration is ${duration} days`,
  document.getElementById('travel-weather').innerHTML = `The Weather for then is: \n High - ${weatherInfo.max_temp} , Low - ${weatherInfo.min_temp}`
  document.getElementById('travel-img').src = photo.largeImageURL
}

export {
  handleSubmit,
  fetchCityPhoto,
  fetchCountries,
  sample
}