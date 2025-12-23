import Container from "@/Components/Container";
import Link from "next/link";
import React from "react";
import logo from "../../public/logo.png";
import Image from "next/image";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="py-2 bg-white">
      <Container>
        <div className="flex justify-between items-center relative">
          {/* logo */}
          <div>
            <Link href={"/"}>
              <div className="flex items-center gap-1">
                <Image width={50} height={50} src={logo} alt="Logo" />
                <h3 className="text-3xl font-bold text-center text-[#f89aac] hidden md:block">
                  Care.<span>xyz</span>
                </h3>
              </div>
            </Link>

            <FaBars
              size={18}
              className="text-[#fc8298] bg-white rounded-full p-0.5 absolute md:hidden bottom-0.5 left-8"
            />
          </div>

          <div className="flex items-center gap-20">
            {/* desktop nav */}
            <nav className="space-x-5 hidden md:block text-right">
              <Link href={"/"}>Home</Link>
              <Link href={"/services"}>Services</Link>
              <Link href={"/about"}>About</Link>
              {/* <Link href={"/my-bookings"}>My Booking</Link> */}
            </nav>

            {/* sign */}
            <div className="flex justify-end gap-2">
              <Link href={"/login"}>
                <button className="btn-secondary">Login</button>
              </Link>
              <Link href={"/register"}>
                <button className="btn-primary">Register</button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
