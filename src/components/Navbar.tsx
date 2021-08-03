/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useCart } from "context";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CartIcon } from "icons";
import { useCallback, useState } from "react";

export const Navbar = () => {
  const { cart } = useCart();
  const { pathname } = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobilemenu = useCallback(() =>
    setIsMobileMenuOpen(prev => !prev), [])

  const quantity = cart?.total_items || 0;
  const displayCartItems = !!quantity && !/checkout/.test(pathname) && !/cart/.test(pathname);

  return (
    <motion.div animate={{ y: 0 }} className='bg-gray-800 overflow-x-hidden  '>
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 '>
        <div className='relative flex items-center justify-between h-16'>
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
            {/* <!-- Mobile menu button--> */}
            <button
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-controls='mobile-menu'
              aria-expanded='false'
              onClick={toggleMobilemenu}
            >
              <span className='sr-only'>Open main menu</span>

              <HamburgerIcon />
            </button>
          </div>
          <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='flex-shrink-0 flex items-center'>
              <Link href="/" passHref>
                <img
                  className='block h-8 w-auto mr-2'
                  src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                  alt='Workflow'
                />
              </Link>
              <Link href="/" >
                <a className="text-2xl text-white font-semibold hidden md:block transform -translate-y-1"> e-commerce </a>
              </Link>
            </div>
            <div className='hidden sm:block sm:ml-6'>
              <div className='flex space-x-4'>
                <Link href="/products">
                  <a
                    className='bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-100 hover:bg-opacity-75 transition-colors'
                    aria-current='page'
                    onClick={toggleMobilemenu}
                  >
                    Products
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            <button className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
              <span className='sr-only'>View notifications</span>
              <Link href='/cart' passHref>
                <div className='relative'>
                  <a>
                    <CartIcon />
                  </a>
                  <AnimatePresence exitBeforeEnter>
                    {displayCartItems && (
                      <motion.div
                        initial={{ scale: 0.1, rotate: "0" }}
                        animate={{
                          scale: 1,
                          rotate: ["40deg", "-20deg", "20deg", "-10deg", "0"],
                        }}
                        exit={{ scale: 0.1, y: -5 }}
                        className=' bg-red-600 text-white font-semibold rounded-full absolute px-2 -top-4 left-3 md:left-6'
                      >
                        {quantity}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className='sm:hidden' id='mobile-menu'>
        {isMobileMenuOpen && <div
          className='px-2 pt-2 pb-3 space-y-1'>
          <Link href="/products">
            <a
              className='bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
              aria-current='page'
              onClick={toggleMobilemenu}

            >
              Products
            </a>
          </Link>
        </div>}

      </div>
    </motion.div>
  );
};

const HamburgerIcon = () => (
  <svg
    className='block h-6 w-6'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    aria-hidden='true'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M4 6h16M4 12h16M4 18h16'
    />
  </svg>
);

