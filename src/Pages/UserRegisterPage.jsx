import * as React from "react";
import logo from "../assets/petpet-logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FormWarning from "../utils/FormWarning";
import { UserRegisteration } from "../api/api";

export default function UserRegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  // const [password2, setPassword2] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [sex, setSex] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showToast2, setShowToast2] = useState(false);

  const onSignUpHandle = async (e) => {
    if (
      email &&
      password1 &&
      // password2 &&
      firstname &&
      lastname &&
      phone &&
      street &&
      city &&
      state &&
      country &&
      sex
    ) {
      const registerUser = {
        first_name: firstname,
        middle_name: null,
        last_name: lastname,
        email: email,
        password: password1,
        street_number: street,
        city: city,
        zip: 0,
        state: state,
        country: country,
        phone_number: phone,
        sex: sex,
      };
      e.preventDefault();
      // Execute the API post request
      let resp = await UserRegisteration(registerUser);
      if (!resp) {
        setShowToast2(false);
        navigate("/login");
      } else if (resp.message === "This email already exists") {
        setShowToast2(true);
        navigate("/register");
      }
      console.log(resp.message);
      console.log(registerUser);
    } else {
      setShowToast(true);
    }
  };

  return (
    <div className=' w-11/12 max-w-[700px] m-auto rounded-3xl bg-white border-2 border-gray-100'>
      {showToast && <FormWarning message='Please fill in all details' />}{" "}
      {showToast2 && (
        <FormWarning message='This email already exists ,Please enter different email' />
      )}{" "}
      {/* Render the toast component conditionally */}
      <div className='w-full flex items-center justify-center flex-col '>
        <h1 className='text-5xl font-semibold leading-loose'>High 4</h1>
        <img src={logo} alt='' className='w-1/6 mx-50' />
        <p className='font-medium text-center text-gray-500 mt-4 font-semibold'>
          Join Our Community
        </p>
      </div>
      <form className='max-w-md mx-auto'>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='email'
            name='floating_email'
            id='floating_email'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor='floating_email'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Email address
          </label>
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='password'
            name='floating_password'
            id='floating_password'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          <label
            htmlFor='floating_password'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Password
          </label>
        </div>
        {/* <div className='relative z-0 w-full mb-5 group'>
          <input
            type='password'
            name='repeat_password'
            id='floating_repeat_password'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <label
            htmlFor='floating_repeat_password'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Confirm password
          </label>
        </div> */}
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='text'
              name='floating_first_name'
              id='floating_first_name'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <label
              htmlFor='floating_first_name'
              className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              First name
            </label>
          </div>
          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='text'
              name='floating_last_name'
              id='floating_last_name'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <label
              htmlFor='floating_last_name'
              className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              Last name
            </label>
          </div>
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='tel'
            name='floating_phone'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label
            htmlFor='floating_phone'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Phone number
          </label>
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='text'
            name='floating_phone'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <label
            htmlFor='floating_phone'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Street Address
          </label>
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='text'
            name='floating_phone'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label
            htmlFor='floating_phone'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            City
          </label>
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='text'
            name='floating_phone'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <label
            htmlFor='floating_phone'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            State
          </label>
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='text'
            name='floating_phone'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <label
            htmlFor='floating_phone'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Country
          </label>
        </div>

        <h3 className='mb-4 text-gray-900 dark:text-white'>Sex</h3>
        <ul className='items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
          <li className='w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600'>
            <div className='flex items-center ps-3'>
              <input
                id='horizontal-list-radio-license'
                type='radio'
                value=''
                name='list-radio'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                onChange={(e) => setSex("male")}
              />
              <label
                htmlFor='horizontal-list-radio-license'
                className='w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Male{" "}
              </label>
            </div>
          </li>
          <li className='w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600'>
            <div className='flex items-center ps-3'>
              <input
                id='horizontal-list-radio-id'
                type='radio'
                value=''
                name='list-radio'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                onChange={(e) => setSex("female")}
              />
              <label
                htmlFor='horizontal-list-radio-id'
                className='w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Female
              </label>
            </div>
          </li>
          <li className='w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600'>
            <div className='flex items-center ps-3'>
              <input
                id='horizontal-list-radio-military'
                type='radio'
                value=''
                name='list-radio'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                onChange={(e) => setSex("none")}
              />
              <label
                htmlFor='horizontal-list-radio-military'
                className='w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Prefer not to say
              </label>
            </div>
          </li>
        </ul>

        <div className='mt-8 flex flex-col gap-y-4'>
          <button
            onClick={onSignUpHandle}
            className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'
          >
            Register
          </button>
        </div>
      </form>
      <div className='mt-8 flex justify-center items-center'>
        <p className='font-medium text-base'>Have an existing account</p>
        <button
          className='ml-2 font-medium text-base text-violet-500'
          onClick={() => navigate("/login")}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
