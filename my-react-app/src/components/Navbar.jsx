import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Ministries', path: '/ministries' },
    { name: 'Events', path: '/events' },
    { name: 'Sermons', path: '/sermons' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
  const handleScroll = () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 10) {
      nav.classList.add('shadow-lg');
    } else {
      nav.classList.remove('shadow-lg');
    }
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);


  return (
    <nav className="fixed top-0 w-full bg-primary text-black shadow-md z-50 bg-gray-100 ">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-black font-bold text-lg">
          <span className="text-2xl">✝️📖</span>
          <span>KSTVET CU</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-sm font-medium items-center">
          {menuItems.map(item => (
            <li key={item.name}>
              <Link 
              to={item.path}
                className="flex items-center text-black hover:text-yellow-400 transition-colors duration-300"
              >{item.name}</Link>
            </li>
          ))}
        </ul>
         <div className='hidden md:flex gap-3'>
            <Link
          to="/form"
          className="hidden md:inline-block bg-green-400 text-primary font-semibold px-4 py-2 rounded-md hover:bg-yellow-400 transition"
        >
          Join Us
        </Link>
           <Link
            to="/login"
            className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Admin Login
          </Link>
         </div>
        
        
        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-black text-2xl focus:outline-none"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div 
         className={`md:hidden bg-primary px-4 pb-4 transform transition-transform duration-300 ${
    isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
  }`}>
          <ul className="flex flex-col gap-4 text-sm font-medium">
            {menuItems.map(item => (
              <li key={item.name}>
                <Link to={item.path} 
                 className="flex items-center text-black hover:text-yellow-400 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/form"
                className="bg-green-400 text-primary font-semibold px-4 py-2 rounded-md hover:bg-yellow-400 transition block text-center"
                onClick={() => setIsOpen(false)}
              >
                Join Us
              </Link>
            </li>
             <li>
              <Link
                to="/login"
                className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition block text-center"
                onClick={() => setIsOpen(false)}
              >
                Admin Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
export default NavBar;
