import { getAllUsers } from '../api/api'
import geocode from './geocodeService'

const geocodeUsers = async () => {
  try {
    const users = await getAllUsers()
    for (const user of users) {
      const address = `${user.street_number}, ${user.city}, ${user.state}, ${user.country}`
      try {
        const { lat, lng } = await geocode(address)
        user.lat = lat
        user.lng = lng
        // an option: to update user data back to the server
        // console.log(`Geocoded ${address}: ${lat}, ${lng}`)
      } catch (error) {
        console.error(`Failed to geocode ${address}:`, error)
      }
    }

    // console.log('Updated users with geocode data:', users)
  } catch (error) {
    console.error('Error fetching users for geocoding:', error)
  }
}

export default geocodeUsers

// const geocodeUsers = async () => {
//   for (const user of users) {
//     const address = `${user.street_number}, ${user.city}, ${user.state}, ${user.country}`
//     try {
//       const { lat, lng } = await geocode(address)
//       user.lat = lat
//       user.lng = lng
//       // console.log(`Geocoded ${address}: ${lat}, ${lng}`)
//     } catch (error) {
//       console.error(`Failed to geocode ${address}:`, error)
//     }
//   }
//   // console.log('Updated users:', users)
// }

// export default geocodeUsers
