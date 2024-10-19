import React from 'react';
import { FaGithub } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-700 text-white py-2">
        <div className="container mx-auto px-4 flex justify-end items-center">
            <p className="mr-4">nicku123</p>
            <a 
                href="https://github.com/nicku12345/hk-taxi-fare-calculator-v1" 
                className="hover:text-gray-400"
                target="_blank" 
                rel="noopener noreferrer"
            >
                <FaGithub className='mr-1'/>
            </a>
        </div>
    </footer>
  )
}