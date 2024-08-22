import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white py-4 border-t border-gray-300">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-black">&copy; {currentYear} High 4</div>
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black">
            <FaFacebook className="h-6 w-6" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black">
            <FaTwitter className="h-6 w-6" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black">
            <FaInstagram className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
