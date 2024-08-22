import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import geocode from "../service/geocodeService";

const SearchForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const latLng = await geocode(location);
      navigate(
        `/search?location=${location}&startDate=${startDate}&endDate=${endDate}&guests=${guests}&lat=${latLng.lat}&lng=${latLng.lng}`
      );
    } catch (error) {
      console.error("Error fetching geocode: ", error);
    }
  };

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setLocation(value);
    setCoordinates(latLng);
  };

  return (
    <div className='container mx-auto mt-24 p-4'>
      <form
        onSubmit={handleSubmit}
        className='flex justify-center items-center space-x-4'
      >
        <div className='flex space-x-4 items-center p-4 bg-white rounded-full shadow-lg'>
          {/* <PlacesAutocomplete
            value={location}
            onChange={setLocation}
            onSelect={handleSelect}
            className='border p-2 rounded-full w-1/4 focus:border-2 focus:border-primaryColor focus:outline-none'
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div className='relative'>
                <input
                  {...getInputProps({
                    placeholder: "Where",
                    className:
                      "border p-2 rounded-full w-full focus:border-2 focus:border-primaryColor focus:outline-none",
                  })}
                />
                <div className='absolute z-10 w-full bg-white shadow-lg rounded-lg'>
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? "bg-gray-200 cursor-pointer p-2"
                      : "bg-white cursor-pointer p-2";
                    return (
                      <div
                        key={suggestion.placeId}
                        {...getSuggestionItemProps(suggestion, {
                          className,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete> */}

          <input
            type='text'
            placeholder='Location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className='border p-2 rounded-full w-1/4 focus:border-2 focus:border-primaryColor focus:outline-none'
          />
          <input
            type='number'
            placeholder='Rating'
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className='border p-2 rounded-full w-1/4 focus:border-2 focus:border-primaryColor focus:outline-none'
          />
          <input
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder='Check in'
            className='border p-2 rounded-full w-1/4 focus:border-2 focus:border-primaryColor focus:outline-none'
          />
          <input
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder='Check out'
            className='border p-2 rounded-full w-1/4 focus:border-2 focus:border-primaryColor focus:outline-none'
          />
          <button
            type='submit'
            className='bg-primaryColor text-white p-2 rounded-full flex items-center justify-center w-12 h-12'
          >
            <FaSearch />
          </button>
        </div>
        <button className='bg-primaryColor text-white p-2 rounded-full flex items-center justify-center h-12 hover:bg-secondaryColor hover:cursor-pointer'>
          Advanced Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
