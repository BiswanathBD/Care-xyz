import Container from "@/Components/Container";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import heroImg from "../../public/hero.png";

const Hero = () => {
  return (
    <section className="bg-[#5bb4b7] text-white py-8 md:py-12 lg:py-24">
      <Container>
        <div className="grid md:grid-cols-2 gap-4 lg:gap-8 xl:gap-16 items-center">
          {/* image */}
          <div className="flex justify-center -mb-4">
            <Image src={heroImg} alt="Caregiving service" className="w-full" />
          </div>

          {/* content */}
          <div>
            <h1 className="text-3xl lg:text-5xl xl:text-7xl font-bold">
              Trusted Care for Your
              <span className="text-[#fe94a8]"> Loved</span> Ones
            </h1>

            <p className="mt-4 md:mt-8 text-white/90 text-sm md:text-lg">
              Find reliable babysitters, elderly care providers, and home care
              services tailored to your family’s needs. We connect you with
              trained and trusted caregivers who treat your loved ones with
              compassion, dignity, and respect — making care safe, secure, and
              accessible whenever you need it.
            </p>

            <div className="mt-6 md:mt-12 flex flex-wrap gap-4">
              <Link href="/services" className="btn-primary px-4! py-2!">
                Explore Services
              </Link>
              <Link
                href="/about"
                className="border border-white px-4 py-2 hover:bg-white hover:text-[#5bb4b7] transition rounded-xs font-semibold"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
