import About from "@/Components/About";
import Hero from "@/Components/Hero";
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
