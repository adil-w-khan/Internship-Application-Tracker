import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-blue-400 mb-3">
              AppTrack By Adil
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Track your internship applications with ease. Stay organized, 
              monitor your progress, and land your dream internship.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">
              Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://linkedin.com/in/adil-w-khan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 text-sm transition duration-200 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  About Me
                </a>
              </li>
              <li>
                <Link
                    to="/terms-of-service"
                    className="text-gray-300 hover:text-blue-400 text-sm transition duration-200"
                >
                    Terms of Service
                </Link>
            </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-300 hover:text-blue-400 text-sm transition duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:apptrackbyadil@gmail.com"
                className="text-gray-300 hover:text-blue-400 text-sm transition duration-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                apptrackbyadil@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-400 text-sm">
              © {currentYear} AppTrack By Adil. All rights reserved.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;