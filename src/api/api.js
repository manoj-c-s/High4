import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";
// const baseUrl = import.meta.env.VITE_BASE_URL;

// export const getAllUsers = async () => {
//   try {
//     const response = await axios.get(`${baseUrl}/users`)
//     return response.data
//   } catch (error) {
//     console.error('Fails to fetch users:', error)
//     throw error
//   }
// }

export const getAllUsers = async () => {
  // const url = baseUrl + "/users/";
  const url = "http://54.224.168.46/home_page/";
  // console.log(`Requesting: ${url}`)
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Fails to fetch users:", error);
    throw error;
  }
};

export const UserRegisteration = async (registerUser) => {
  try {
    const response = await axios.post(
      `http://54.224.168.46/user/register/`,
      registerUser,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("There was a problem with the axios operation:", error);
  }
  // POST request using fetch
  // fetch("http://127.0.0.1:8000/api/register/", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(registerUser),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("Response:", data);
  //     // Handle the response as needed
  //   })
  //   .catch((error) => console.error("Error:", error));
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`http://54.224.168.46/user/login/`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    return error.response ? error.response : new Error("Network Error");
  }
};
