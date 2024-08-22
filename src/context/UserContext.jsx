import { createContext, useEffect, useState } from "react";
import { getAllUsers } from "../api/api";
import geocode from "../service/geocodeService";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  // useEffect(async () => {
  //     const fetchAndGeocodeUsers = async () => {
  //       setIsLoading(true)
  //       try {
  //   const fetchedUsers = await getAllUsers();
  //   //       const geocodedUsers = await Promise.all(
  //   //         fetchedUsers.map(async (user) => {
  //   //           const address = `${user.street_number}, ${user.city}, ${user.state}, ${user.country}`
  //   //           try {
  //   //             const { lat, lng } = await geocode(address)
  //   //             return { ...user, lat, lng } // return new user object with lat and lng :)
  //   //           } catch (error) {
  //   //             console.error(`Failed to geocode address ${address}:`, error)
  //   //             return user // if geocode fails- we'll return the original user
  //   //           }
  //   //         })
  //   //       )
  //   setUsers(fetchedUsers);
  //       } catch (error) {
  //         console.error('Failed to fetch users:', error)
  //         setIsError(error)
  //       }
  //       setIsLoading(false)
  //     }

  //     fetchAndGeocodeUsers()
  // }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchUsers = await getAllUsers()
        setUsers(fetchUsers)
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to fetch users:', error)
        setIsError(error)
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <UserContext.Provider value={{ users, isLoading, isError }}>
      {children}
    </UserContext.Provider>
  );
}
