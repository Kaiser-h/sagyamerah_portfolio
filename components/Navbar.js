"use client";
import React, { useContext, useState } from "react";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import GlobalContext from "./context/Context";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { setActiveSection } = useContext(GlobalContext);
  const [showNavbar, setShowNavbar] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Research Interest", href: "/research" },
    { name: "Publications", href: "/publications" },
    { name: "Supervisions", href: "/supervisions" },
    { name: "Teaching", href: "/teaching" },
  ];

  const pathname = usePathname();

  return (
    <>
      {pathname === "/backdoor" || pathname === "/login" ? (
        <div></div>
      ) : (
        <div className="z-50 flex w-svw justify-center fixed bg-[#1b1a1a]">
          <div className="container flex w-svw items-center justify-between py-6 text-white px-3">
            <Link href="/" className="cursor-pointer">
              <Typography variant="h4" className="cursor-pointer">
                Gyamerah, Samuel Asante
              </Typography>
              <Typography>University of Waterloo</Typography>
              <Typography>
                Kwame Nkrumah University of Science and Technology
              </Typography>
            </Link>

            <ul className="hidden xl:flex gap-6">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <Link key={index} href={link.href}>
                    <li
                      className={`cursor-pointer p-3 ${isActive && "active"}`}
                    >
                      {link.name}
                    </li>
                  </Link>
                );
              })}
            </ul>
            <div
              className="block xl:hidden text-primary p-3 bg-black"
              onClick={() => setShowNavbar(!showNavbar)}
            >
              {!showNavbar ? <TiThMenu /> : <IoClose />}
            </div>

            {showNavbar && (
              <div className="bg-dark absolute top-0 right-0 pt-10">
                <ul className="flex flex-col  w-64 h-svh bg-dark">
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={index}
                        href={link.href}
                        onClick={() => setShowNavbar(!showNavbar)}
                      >
                        <li
                          className={`cursor-pointer p-3 ${
                            isActive && "active"
                          }`}
                        >
                          {link.name}
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
