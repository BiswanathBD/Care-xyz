"use client";

import Container from "@/Components/Container";
import Image from "next/image";
import { motion } from "framer-motion";
import aboutImg from "../../../public/hero.png";
import Title from "@/Components/Title";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <section className="bg-white py-8 md:py-16">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Title>
            <h2>About Care.xyz</h2>
            <p className="text-gray-600 text-sm font-medium">
              We connect families with trusted caregivers, ensuring safety,
              dignity, and peace of mind for every home.
            </p>
          </Title>
        </motion.div>

        {/* Image + Content */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10 items-center mt-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image src={aboutImg} alt="Caregiving service" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 xl:col-span-2 md:text-lg"
          >
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold text-[#fc8298]">Care.xyz</span> is
              a trusted caregiving platform built to support families in finding
              reliable, compassionate, and professional care for children,
              elderly parents, and individuals who need special assistance at
              home. We understand how important it is to feel confident about
              who is caring for your loved ones.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Our platform bridges the gap between families and verified
              caregivers by offering a simple, secure, and transparent booking
              experience. From flexible service durations to location-based care
              selection, we ensure that every family can find care that fits
              their unique needs and lifestyle.
            </p>

            <p className="text-gray-700 leading-relaxed">
              At Care.xyz, our mission is to remove the stress and uncertainty
              from the caregiving process. Through trusted professionals, clear
              communication, and user-friendly tools, we help families focus on
              what truly matters — the comfort, dignity, and well-being of their
              loved ones.
            </p>
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mt-20">
          {[
            {
              title: "Our Mission",
              text: "Our mission is to make caregiving simple, reliable, and accessible for every family. We strive to connect families with trusted, trained, and compassionate caregivers who provide quality care for children, elderly individuals, and those who need special assistance. By focusing on safety, transparency, and ease of use, we aim to reduce the stress of finding care and help families feel confident and supported in every decision they make.",
            },
            {
              title: "Our Vision",
              text: "Our vision is to build a caring community where every individual receives the respect, dignity, and attention they deserve. We aspire to become a leading caregiving platform that sets new standards for trust, compassion, and excellence in home care services. Through innovation and continuous improvement, we envision a future where quality caregiving is easily available, empowering families and caregivers alike.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="p-6 rounded-xl bg-[#5bb4b7] text-white"
              style={{ boxShadow: "0 15px 40px rgba(0,0,0,0.15)" }}
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-white/90">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default About;
