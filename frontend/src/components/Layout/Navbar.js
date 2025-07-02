import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="bg-indigo-900 dark:bg-gray-800 shadow-lg p-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          NASA Explorer
        </Link>
        <div className="flex items-center gap-6">
          <div className="flex gap-6">
            <NavLink 
              to="/" 
              className={({isActive}) => 
                `text-white px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? 'bg-indigo-700 dark:bg-gray-700' : 'hover:bg-indigo-800 dark:hover:bg-gray-700'
                }`
              }
            >
              APOD
            </NavLink>
            <NavLink 
              to="/mars" 
              className={({isActive}) => 
                `text-white px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? 'bg-indigo-700 dark:bg-gray-700' : 'hover:bg-indigo-800 dark:hover:bg-gray-700'
                }`
              }
            >
              Mars
            </NavLink>
            <NavLink 
              to="/epic" 
              className={({isActive}) => 
                `text-white px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? 'bg-indigo-700 dark:bg-gray-700' : 'hover:bg-indigo-800 dark:hover:bg-gray-700'
                }`
              }
            >
              EPIC
            </NavLink>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;