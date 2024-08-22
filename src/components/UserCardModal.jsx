import React from 'react'
import { capitalizeFirstLetter } from '../utils/utils'
import { FaStar } from 'react-icons/fa'

function UserCardModal({ user, onClose, position, elementRef }) {
  const {
    first_name,
    middle_name,
    last_name,
    street_number,
    city,
    rating,
    served,
    credit,
    pets,
  } = user

  // as default- access the first pet's image if available, otherwise using a placeholder image
  const petImage =
    pets && pets.length > 0
      ? pets[0].image
      : 'https://placehold.co/600x400/007BFF/FFFFFF?text=No+Image+Available&font=roboto'

  return (
    <div className="fixed inset-0 bg-transparent flex justify-center items-center">
      <div
        ref={elementRef}
        className="bg-white rounded-lg shadow-lg"
        style={{
          width: '315px',
          height: '320px',
          position: 'absolute',
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}>
        <div className="absolute top-2 right-2 flex space-x-2">
          {/* Placeholder for X icon */}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100">
            <svg
              className="w-4 h-4 text-gray-800"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.707 4.293a1 1 0 0 0-1.414 1.414L10.586 11l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 12.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 11l5.293-5.293a1 1 0 0 0-1.414-1.414L12 9.586 6.707 4.293z"
              />
            </svg>
          </button>
        </div>
        <img
          src={petImage}
          alt={`${first_name} ${last_name}`}
          className="w-full h-48 object-cover"
        />
        <div className="px-4 pt-4 pb-5">
          <h2 className="text-lg font-semibold">
            {`${capitalizeFirstLetter(first_name)} ${
              middle_name ? capitalizeFirstLetter(middle_name) + ' ' : ''
            }${capitalizeFirstLetter(last_name)}`.trim()}
          </h2>

          <p className="text-sm text-gray-600">
            {capitalizeFirstLetter(street_number)},{' '}
            {capitalizeFirstLetter(city)}
          </p>
          <div className="flex items-center mt-2">
            <FaStar className="text-yellow-500 mr-1" />
            <p className="text-gray-700 text-sm">{rating}</p>
            <p className="text-gray-600 text-sm ml-2">({served} served)</p>
          </div>
          <div className="mt-2 mb-2">
            <span className="text-base font-bold text-gray-800">
              {`${credit}₪`}
            </span>
            <span className="text-base text-gray-800">night</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCardModal
