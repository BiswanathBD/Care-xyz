import Container from "@/Components/Container";
import Image from "next/image";
import aboutImg from "../../../public/hero.png";
import Title from "@/Components/Title";

export const metadata = {
  title: "About Care.xyz | Trusted Caregiving Services",
  description:
    "Care.xyz provides reliable, professional, and compassionate caregiving services for children, elderly, and individuals needing special assistance at home.",
};

export default function About() {
  return (
    <section className="bg-white py-16">
      <Container>
        {/* Header */}
        <Title>
          <h1>About Care.xyz</h1>
          <p className="text-gray-600 text-sm font-medium">
            Connecting families with trusted caregivers, ensuring safety, dignity, and peace of mind for every home.
          </p>
        </Title>

        {/* Image + Content */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-5 gap-10 items-center mt-16">
          {/* Image */}
          <div className="relative w-full xl:col-span-2">
            <Image
              src={aboutImg}
              alt="Caregiving service"
              className="object-cover rounded-xl"
            />
          </div>

          {/* Content */}
          <div className="space-y-6 xl:col-span-3 md:text-lg">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-[#fc8298]">Care.xyz</strong> is a trusted
              caregiving platform built to support families in finding reliable,
              compassionate, and professional care for children, elderly parents,
              and individuals who need special assistance at home. We understand
              how important it is to feel confident about who is caring for your
              loved ones.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Our platform bridges the gap between families and verified caregivers
              by offering a simple, secure, and transparent booking experience. From
              flexible service durations to location-based care selection, we ensure
              that every family can find care that fits their unique needs and lifestyle.
            </p>

            <p className="text-gray-700 leading-relaxed">
              At Care.xyz, our mission is to remove the stress and uncertainty from
              the caregiving process. Through trusted professionals, clear communication,
              and user-friendly tools, we help families focus on what truly matters —
              the comfort, dignity, and well-being of their loved ones.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mt-20">
          <div className="p-6 rounded-xl bg-[#5bb4b7] text-white" style={{ boxShadow: "0 15px 40px rgba(0,0,0,0.15)" }}>
            <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
            <p>
              Our mission is to make caregiving simple, reliable, and accessible
              for every family. We strive to connect families with trusted,
              trained, and compassionate caregivers who provide quality care for
              children, elderly individuals, and those who need special assistance.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-[#5bb4b7] text-white" style={{ boxShadow: "0 15px 40px rgba(0,0,0,0.15)" }}>
            <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
            <p>
              Our vision is to build a caring community where every individual
              receives the respect, dignity, and attention they deserve. We aspire
              to become a leading caregiving platform that sets new standards for
              trust, compassion, and excellence in home care services.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
