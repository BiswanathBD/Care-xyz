import React from "react";
import Container from "./Container";
import Title from "./Title";

const About = () => {
  return (
    <section className="pt-8 md:pt-16 mt-8 bg-white">
      <Container>
        <div>
          {/* title */}
          <Title>
            <div>
              <h2>About Us</h2>
              <p className="text-gray-600 text-sm font-medium">
                Building trust through compassionate and reliable caregiving
                services for every family.
              </p>
            </div>
          </Title>

          {/* description */}
          <div className="grid gap-4 md:gap-8 mt-8 text-sm md:text-lg lg:text-xl leading-relaxed">
            <p
              className="p-4 md:p-8 rounded-lg"
              style={{ boxShadow: "0 0px 30px rgba(0,0,0,0.06)" }}
            >
              <span className="font-semibold text-[#fc8298]">Care.xyz</span> is
              a trusted caregiving service platform designed to support families
              in finding reliable care for children, elderly parents, and
              individuals who need special assistance at home. We focus on
              making the caregiving process simple, transparent, and
              stress-free.
            </p>

            <p
              className="p-4 md:p-8 rounded-lg"
              style={{ boxShadow: "0 0px 30px rgba(0,0,0,0.06)" }}
            >
              Our platform enables users to easily explore services, choose
              suitable care options, and book caregivers based on their
              preferred time and location. Through verified caregivers, secure
              bookings, and a user-friendly system, Care.xyz is committed to
              providing quality care while ensuring comfort, dignity, and peace
              of mind for every family.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
