import React from "react";
import Link from "next/link";
import Container from "./Container";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#5bb4b7] text-white pt-14 mt-12 md:mt-24">
      <Container>
        {/* Top */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 pb-10">

          <p className="text-sm text-white/90 leading-relaxed max-w-xs">
            <span className="text-2xl font-semibold text-[#f89aac]">
              Care.xyz
            </span>{" "}
            is a trusted caregiving platform connecting families with verified
            caregivers for baby care, elderly care, and home support — making
            care simple, secure, and accessible.
          </p>

          <div className="w-fit md:mx-auto">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/90">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/my-bookings">My Bookings</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
            </ul>
          </div>

          <div className="w-fit lg:mx-auto">
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm text-white/90">
              <li>Baby Care</li>
              <li>Elderly Care</li>
              <li>Sick People Care</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-center">
              Connect With Us
            </h4>
            <div className="flex gap-4 mt-2 justify-center">
              <a className="p-2 bg-white/20 rounded-full hover:bg-[#fc8298] transition">
                <FaFacebookF />
              </a>
              <a className="p-2 bg-white/20 rounded-full hover:bg-[#fc8298] transition">
                <FaInstagram />
              </a>
              <a className="p-2 bg-white/20 rounded-full hover:bg-[#fc8298] transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 py-4 text-center text-sm text-white/80">
          © {new Date().getFullYear()} Care.xyz. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
