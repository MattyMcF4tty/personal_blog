// NOT BEING USED, NOT WORKING AS SUPPOSED TO. WILL FIX LATER

'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const router = useRouter();

  /* Handle showing and unshowing of navigation bar */
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // If scroll change is less than 60px do nothing
    if (Math.abs(currentScrollY - lastScrollY) < 60) {
      return;
    }

    if (currentScrollY > lastScrollY) {
      setShowNavbar(false); // User scrolled down, hide navbar
    } else {
      setShowNavbar(true); // User scrolled up, show navbar
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    // Specify the pages where you want the scroll effect
    const specificRoutes = ['/']; // Example routes

    if (specificRoutes.includes(router.pathname)) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, router.pathname]);

  return (
    <nav
      className={`w-screen h-12 bg-white fixed top-0 flex flex-row items-center transform transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <Link href={'/'}>
        <Image
          alt=""
          src={'/favicon.ico'}
          width={48}
          height={48}
          className="object-contain rounded-full"
        />
      </Link>
    </nav>
  );
};

export default Navbar;
