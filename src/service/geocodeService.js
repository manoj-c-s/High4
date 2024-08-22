import axios from 'axios'

const geocode = async (address) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`
  const response = await axios.get(url)
  if (response.data.status === 'OK') {
    return response.data.results[0].geometry.location
  } else {
    throw new Error(response.data.error_message || 'Geocoding failed')
  }
}

export default geocode
