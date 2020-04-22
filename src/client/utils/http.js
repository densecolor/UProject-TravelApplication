import axios from 'axios'

// backend baseURL
axios.defaults.baseURL = 'http://localhost:3000'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

// export http get async gfunction
const http = {
  get (url, params) {
    return new Promise((resolve, reject) => {
      const config = {
        url,
        params: JSON.stringify(params),
        method: 'get'
      }
      axios(config)
        .then(res => {
          if (res && res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  post (url, params) {
    return new Promise((resolve, reject) => {
      const config = {
        url,
        params: null,
        data: params,
        method: 'post'
      }
      axios(config)
        .then(res => {
          if (res && res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default http
