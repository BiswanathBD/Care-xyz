import React from "react";
import Title from "./Title";
import { FaStar } from "react-icons/fa";
import Container from "./Container";
import { FaSmile, FaUserCheck, FaCalendarCheck } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Rahim Ahmed",
    role: "Father",
    feedback:
      "Care.xyz helped us find a caring babysitter for our child. The process was smooth and trustworthy. Highly recommended!",
  },
  {
    id: 2,
    name: "Shila Akter",
    role: "Daughter",
    feedback:
      "The elderly care service was professional and compassionate. My mother felt comfortable and safe at home.",
  },
  {
    id: 3,
    name: "Tanvir Hasan",
    role: "Patient",
    feedback:
      "Excellent service and very supportive caregivers. Booking was easy and transparent throughout the process.",
  },
];

const stats = [
  {
    id: 1,
    value: "5K+",
    label: "Happy Families",
    icon: <FaSmile size={28} />,
  },
  {
    id: 2,
    value: "1K+",
    label: "Verified Caregivers",
    icon: <FaUserCheck size={28} />,
  },
  {
    id: 3,
    value: "10K+",
    label: "Successful Bookings",
    icon: <FaCalendarCheck size={28} />,
  },
];

const Testimonials = () => {
  return (
    <section className="pt-8 md:pt-16 mb-12 md:mb-24">
      <Container>
        {/* title */}
        <Title>
          <div>
            <h2>What People Say</h2>
            <p className="text-gray-600 text-sm font-medium">
              Real stories from families who trust Care.xyz
            </p>
          </div>
        </Title>

        {/* testimonials */}
        <div className="grid gap-8 lg:grid-cols-3 mt-10">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-6"
              style={{ boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4 text-[#fc8298]">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} />
                ))}
              </div>

              {/* Feedback */}
              <p className="text-gray-600 text-sm leading-relaxed">
                “{item.feedback}”
              </p>

              {/* User */}
              <div className="mt-4">
                <h4 className="font-semibold">{item.name}</h4>
                <span className="text-xs text-gray-500">{item.role}</span>
              </div>
            </div>
          ))}
        </div>

        {/* success */}
        <div className="flex flex-wrap gap-6 mt-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="p-5 text-white bg-[#5bb4b7] flex items-center justify-between gap-4 flex-1 rounded-2xl text-nowrap"
              style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.15)" }}
            >
              <div className="flex gap-2 items-center">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20">
                  {stat.icon}
                </div>

                <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                  {stat.value}
                </h3>
              </div>

              <p className="bg-white/10 md:text-xl py-2 px-4 w-fit rounded-lg">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
