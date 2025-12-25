"use client";
import Container from "@/Components/Container";
import Link from "next/link";
import React, { use, useState } from "react";
import logo from "../../public/logo.png";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { AuthContext } from "@/auth/AuthContext";

const Navbar = () => {
  const { user, loading, userSignOut } = use(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-2 bg-white">
      <Container>
        <div className="flex justify-between items-center relative">
          {/*mobile logo */}
          <div onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            <div className="flex items-center gap-1">
              <Image width={50} height={50} src={logo} alt="Logo" />
            </div>

            <FaBars
              size={18}
              className="text-[#fc8298] bg-white rounded-full p-0.5 absolute bottom-0.5 left-8"
            />
          </div>
          {/* mobile nav */}
          <nav
            className={`grid gap-8 border border-[#fc8298]/50 rounded-xl md:hidden absolute shadow-2xl bg-white/60 backdrop-blur-xl z-50 p-8 transition-all
            ${isOpen ? "top-12" : "top-10 opacity-0 pointer-events-none"}
            `}
          >
            <Link onClick={() => setIsOpen(false)} href={"/"}>
              Home
            </Link>
            <Link onClick={() => setIsOpen(false)} href={"/services"}>
              Services
            </Link>
            <Link onClick={() => setIsOpen(false)} href={"/about"}>
              About
            </Link>
            {user && (
              <Link onClick={() => setIsOpen(false)} href={"/my-bookings"}>
                My Booking
              </Link>
            )}
          </nav>

          {/* desktop logo */}
          <div className="hidden md:block">
            <Link href={"/"}>
              <div className="flex items-center gap-1">
                <Image width={50} height={50} src={logo} alt="Logo" />
                <h3 className="text-3xl font-bold text-center text-[#f89aac]">
                  Care.<span>xyz</span>
                </h3>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-20">
            {/* desktop nav */}
            <nav className="space-x-5 hidden md:block text-right">
              <Link href={"/"}>Home</Link>
              <Link href={"/services"}>Services</Link>
              <Link href={"/about"}>About</Link>
              {user && <Link href={"/my-bookings"}>My Booking</Link>}
            </nav>

            {/* sign */}
            {loading ? (
              <button className="btn-primary bg-gray-300! cursor-not-allowed animate-pulse">
                Loading
              </button>
            ) : user ? (
              <button onClick={() => userSignOut()} className="btn-primary">
                Log Out
              </button>
            ) : (
              <div className="flex justify-end gap-2">
                <Link href={"/login"}>
                  <button className="btn-secondary">Login</button>
                </Link>
                <Link href={"/register"}>
                  <button className="btn-primary">Register</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
