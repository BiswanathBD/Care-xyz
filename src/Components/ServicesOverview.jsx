import React from "react";
import { FaBaby, FaUserNurse, FaUserInjured } from "react-icons/fa";
import Container from "./Container";
import Title from "./Title";

const services = [
  {
    id: 1,
    title: "Baby Care",
    description:
      "Professional and loving babysitting services to ensure your child’s safety, comfort, and happiness at home.",
    icon: <FaBaby size={24} />,
    iconBg: "#fc8298",
  },
  {
    id: 2,
    title: "Elderly Care",
    description:
      "Compassionate elderly care focused on dignity, daily support, and improving quality of life for seniors.",
    icon: <FaUserNurse size={24} />,
    iconBg: "#ff7142",
  },
  {
    id: 3,
    title: "Sick People Care",
    description:
      "Reliable home care services for sick or recovering individuals with attention, patience, and medical support.",
    icon: <FaUserInjured size={24} />,
    iconBg: "#0022ff",
  },
];

const ServicesOverview = () => {
  return (
    <section className="pt-12 md:pt-24">
      <Container>
        {/* title */}
        <Title>
          <div>
            <h2>Our Services</h2>
            <p className="text-gray-600 text-sm font-medium">
              Trusted caregiving solutions designed to support families with
              comfort, dignity, and care.
            </p>
          </div>
        </Title>

        {/* cards */}
        <div className="grid gap-8 lg:grid-cols-3 mt-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-xl p-8 text-white transition-all duration-300 hover:-translate-y-1 bg-[#5bb4b7]"
              style={{ boxShadow: "0 0px 40px rgba(0,0,0,0.06)" }}
            >
              {/* icon and title */}
              <div className="flex gap-2">
                <div
                  className="mb-6 p-2 rounded-full text-white"
                  style={{ backgroundColor: service.iconBg }}
                >
                  {service.icon}
                </div>

                <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
              </div>

              {/* content */}
              <p className="text-white/90">{service.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ServicesOverview;
