import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import UserCard from "../components/UserCard";
// import { users } from '../data/users'
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import UserCardModal from "../components/UserCardModal";
import { UserContext } from "../context/UserContext";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

// const libraries = ['places']
// const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API

const SearchResults = () => {
  const location = useLocation();
  const { users, isLoading, isError } = useContext(UserContext);
  const searchParams = new URLSearchParams(location.search);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [center, setCenter] = useState({
    lat: +lat || 31.0461,
    lng: +lng || 34.8516,
  });
  const searchLocation = searchParams.get("location");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);

  const [position, setPosition] = useState(null);

  const elementRef = useRef();

  // const startDate = searchParams.get('startDate')
  // const endDate = searchParams.get('endDate')
  // const guests = searchParams.get('guests')

  // useEffect(() => {
  //   setCenter({ lat, lng })
  // }, [lat, lng])
  useEffect(() => {
    if (!isNaN(lat) && !isNaN(lng)) {
      setCenter({ lat: parseFloat(lat), lng: parseFloat(lng) });
    }
  }, [lat, lng]);

  const filteredUsers = users.filter((user) => {
    const separatorIndex = searchLocation.indexOf(",");
    const state = searchLocation.substring(0, separatorIndex);
    const country = searchLocation
      .substring(separatorIndex + 1, searchLocation.length)
      .trim();
    return user.state.includes(state) && user.country === country;
  });

  const handleMarkerClick = (event, user) => {
    // console.log(event)
    // const width = 315
    // const height = 320
    // const boundingRect = elementRef.current.getBoundingClientRect()
    // console.log('data on event:', boundingRect)
    const left = event.domEvent.clientX - 320 / 2;
    const top = event.domEvent.clientY + 10;
    setPosition({ left, top });
    setSelectedUser(user);
    setShowModal(true);
    // setCenter({ lat: user.lat, lng: user.lng })
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleMapClick = () => {
    if (showModal) {
      setShowModal(false);
      setSelectedUser(null);
    }
  };

  const handleMouseOver = (user) => {
    setHoveredMarker(user.owner_id);
  };

  const handleMouseOut = () => {
    setHoveredMarker(null);
  };

  const getMarkerIcon = (user) => {
    // Scale changes only on hover
    const isHovered = user.owner_id === hoveredMarker;
    // Color changes only on selection
    const isSelected = selectedUser && user.owner_id === selectedUser.owner_id;

    return {
      path: "M 10,1 h 20 a 10,10 0 0 1 10,10 v 0 a 10,10 0 0 1 -10,10 h -20 a 10,10 0 0 1 -10,-10 v 0 a 10,10 0 0 1 10,-10 z",
      fillColor: isSelected ? "black" : "white",
      fillOpacity: 1,
      strokeColor: "black",
      strokeWeight: 0.2,
      scale: isHovered ? 1.4 : 1.3,
      // labelOrigin: new google.maps.Point(20, 10.5),
    };
  };

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords
  //         setUserLocation({ lat: latitude, lng: longitude })
  //       },
  //       (error) => {
  //         console.error('Error getting location: ', error)
  //         // Handle errors or set a fallback location
  //       }
  //     )
  //   } else {
  //     console.log('Geolocation is not supported by this browser.')
  //     // Optionally set a fallback location
  //   }
  // }, [])

  // console.log('users results:', users)

  return (
    <div className='flex m-16'>
      <div className='w-1/2 overflow-y-scroll grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
        {filteredUsers.map((user) => (
          <UserCard key={user.owner_id} user={user} />
        ))}
      </div>
      <div className='w-1/2'>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={handleMapClick}
        >
          {filteredUsers.map((user) =>
            typeof user.lat === "number" && typeof user.lng === "number" ? (
              <MarkerF
                onClick={(event) => handleMarkerClick(event, user)}
                onMouseOver={() => handleMouseOver(user)}
                onMouseOut={handleMouseOut}
                key={user.owner_id}
                icon={getMarkerIcon(user)}
                position={{ lat: user.lat, lng: user.lng }}
                label={{
                  text: `${user.credit}₪`,
                  color:
                    selectedUser && user.owner_id === selectedUser.owner_id
                      ? "white"
                      : "black",
                  fontSize: "15px",
                  fontFamily:
                    "Circular, -apple-system, system-ui, Roboto, Helvetica Neue, sans-serif",
                  fontWeight: "bold",
                }}
              />
            ) : null
          )}
        </GoogleMap>
        {showModal && selectedUser && position && (
          <div>
            <UserCardModal
              elementRef={elementRef}
              position={position}
              user={selectedUser}
              onClose={closeModal}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
