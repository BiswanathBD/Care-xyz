import About from "@/Components/About";
import Footer from "@/Components/Footer";
import Hero from "@/Components/Hero";
import Navbar from "@/Components/Navbar";
import ServicesOverview from "@/Components/ServicesOverview";
import Testimonials from "@/Components/Testimonials";

export default function Home() {
  return (
    <div>
      <Hero />
      <ServicesOverview />
      <About />
      <Testimonials />
    </div>
  );
}
