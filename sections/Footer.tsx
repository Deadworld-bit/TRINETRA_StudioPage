import { Orbitron } from 'next/font/google';
import { FaTwitter, FaDiscord, FaEnvelope } from 'react-icons/fa';

const orbitron = Orbitron({ subsets: ['latin'] });

export default function Footer() {
  return (
    <footer className="bg-white shadow-md py-4 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Copyright Notice */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <span className={`${orbitron.className} text-gray-800 text-sm`}>
            © 2025 TRINETRA Game Studio. All rights reserved.
          </span>
        </div>

        {/* Social Links and Legal Pages */}
        <div className="flex items-center space-x-6">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-gray-800 hover:text-blue-600 transition"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            className="text-gray-800 hover:text-blue-600 transition"
          >
            <FaDiscord size={24} />
          </a>
          <a
            href="mailto:contact@trinetra.com"
            aria-label="Email"
            className="text-gray-800 hover:text-blue-600 transition"
          >
            <FaEnvelope size={24} />
          </a>
          <a
            href="/privacy-policy"
            className={`${orbitron.className} text-sm text-gray-800 hover:text-blue-600 transition`}
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className={`${orbitron.className} text-sm text-gray-800 hover:text-blue-600 transition`}
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}