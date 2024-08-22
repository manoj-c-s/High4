import React, { useState } from 'react'
import { FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { capitalizeFirstLetter } from '../utils/utils'
// import { users } from '../data/users'

const UserCard = ({ user }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false)

  const {
    owner_id,
    first_name,
    last_name,
    city,
    state,
    rating,
    served,
    email,
    phone_number,
    country,
    pets,
  } = user

  // as default- access the first pet's image if available, otherwise using a placeholder image
  const mainPetImage =
    pets.length > 0 && pets[0].image
      ? pets[0].image
      : 'https://placehold.co/600x400/007BFF/FFFFFF?text=No+Image+Available&font=roboto'

  const toggleDetailsVisibility = () => {
    setIsDetailsVisible(!isDetailsVisible)
  }

  // console.log('users: ', users)

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-4 transition duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer">
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={mainPetImage}
          alt={`${capitalizeFirstLetter(first_name)} ${capitalizeFirstLetter(
            last_name
          )}`}
        />
        <span className="absolute top-2 left-2 bg-green-500 text-white rounded-full px-2 py-1 text-xs">
          online
        </span>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-lg mb-2">
          {`${capitalizeFirstLetter(first_name)} ${capitalizeFirstLetter(
            last_name
          )}`}
        </div>
        <p className="text-gray-600 text-sm">
          Hosted by{' '}
          {`${capitalizeFirstLetter(first_name)} ${capitalizeFirstLetter(
            last_name
          )}`}
        </p>
        <p className="text-gray-600 text-sm">
          {city}, {state}
        </p>
        <div className="flex items-center mt-2">
          <FaStar className="text-yellow-500 mr-1" />
          <p className="text-gray-700 text-sm">{rating}</p>
          <p className="text-gray-600 text-sm ml-2">({served} served)</p>
        </div>
        <button
          onClick={toggleDetailsVisibility}
          className="flex items-center mt-4 text-gray-600 hover:text-gray-800 focus:outline-none">
          {isDetailsVisible ? (
            <FaChevronUp className="mr-2" />
          ) : (
            <FaChevronDown className="mr-2" />
          )}
          {isDetailsVisible ? 'Hide Details' : 'Show Details'}
        </button>
        {isDetailsVisible && (
          <div className="mt-4">
            <p className="text-gray-700 text-base">Email: {email}</p>
            <p className="text-gray-700 text-base">Phone: {phone_number}</p>
            <p className="text-gray-700 text-base">
              City: {capitalizeFirstLetter(city)}
            </p>
            <p className="text-gray-700 text-base">
              State: {capitalizeFirstLetter(state)}
            </p>
            <p className="text-gray-700 text-base">
              Country: {capitalizeFirstLetter(country)}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserCard
