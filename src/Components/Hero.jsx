import Container from "@/Container";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import heroImg from "../../public/hero.png";

const Hero = () => {
  return (
    <section className="bg-[#5bb4b7] text-white py-6 md:py-12 lg:py-18">
      <Container>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          

          {/* content */}
          <div>
            <h1 className="text-3xl lg:text-5xl xl:text-7xl font-bold leading-tight">
              Trusted Care for Your
              <span className="text-[#fe94a8]"> Loved</span> Ones
            </h1>

            <p className="mt-5 text-white/90 text-base md:text-lg">
              Find reliable babysitters, elderly care providers, and home care
              services tailored to your family’s needs — safe, secure, and
              accessible.
            </p>

            <div className="mt-4 md:mt-8 lg:mt-16 flex flex-wrap gap-4">
              <Link href="/services" className="btn-primary px-4! py-2!">
                Explore Services
              </Link>
              <Link
                href="/about"
                className="border border-white px-4 py-2 hover:bg-white hover:text-[#5bb4b7] transition"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* image */}
          <div className="flex justify-center">
            <Image
              src={heroImg}
              alt="Caregiving service"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
