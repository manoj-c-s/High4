import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import HomePage from "./Pages/HomePage";
import SearchResults from "./Pages/SearchResults";
import LoginPage from "./Pages/LoginPage";
import UserRegisterPage from "./Pages/UserRegisterPage";
import UserResults from "./components/UserResults";
import { AuthProvider } from "../src/context/AuthContext";
import { UserProvider } from "../src/context/UserContext";
// import { useJsApiLoader } from '@react-google-maps/api'
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const App = () => {
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  //   libraries,
  // });

  // if (!isLoaded) {
  //   return <div>Loading maps</div>;
  // }
  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  // })

  // if (!isLoaded) return <div>loading...</div>

  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path='/' element={<SharedLayout />}>
              <Route index element={<HomePage />} />
              <Route path='search' element={<SearchResults />} />
              <Route path='user-results' element={<UserResults />} />
            </Route>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<UserRegisterPage />} />
          </Routes>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
