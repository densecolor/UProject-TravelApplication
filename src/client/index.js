import {
  handleSubmit,
  fetchCityPhoto,
  fetchCountries
} from './js/app.js'

import './styles/tailwind.scss'
import './styles/app.scss'

// when app is load, fetch a image as background
(window.onload = async (event) => {
  console.log('page is onload')

  // build countries selector
  const countries = await fetchCountries()
  const countryEl = document.getElementById('grid-country')
  countries.forEach(item => {
    const option = document.createElement('option')
    option.setAttribute('value', item.alpha2Code)
    option.innerHTML = item.name

    countryEl.appendChild(option)
  })

  const imageInfo = await fetchCityPhoto()
  console.log(imageInfo)
  document.body.style.backgroundImage = `url(${imageInfo.largeImageURL})`
  document.body.style.backgroundSize = 'cover'
  document.body.style.backgroundRepeat = 'no-repeat'
})

export {
  handleSubmit
}
