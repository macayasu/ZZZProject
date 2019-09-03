import axios from 'axios'
import config from './config'

const timeout = 60000 // in milisecond


export default function(payload) {

  axios.defaults.baseURL = config.baseurl
  axios.defaults.timeout = timeout
  axios.defaults.headers.common['Authorization'] = `Bearer ${config.token}` || ''

  return new Promise ((resolve, reject) => {
    axios(payload)
    .then(result => {
      if (result.data.ec == 401) {
        window.location.replace('/logout')
      } else {
        resolve(result)
      }
    })
    .catch(error => { reject(error) })
  })
}