import Container from "@/Components/Container";
import ServiceCard from "@/Components/ServiceCard";
import Title from "@/Components/Title";

const getServices = async () => {
  const res = await fetch("http://localhost:3000/services.json");

  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }

  return res.json();
};

export default async function Services() {
  const services = await getServices();
  console.log(services);

  return (
    <section className="py-16">
      <Container>
        <Title>
          <h2>Our Services</h2>
          <p className="text-gray-600 text-sm font-medium">
            Compassionate care for your loved ones, when you need it most
          </p>
        </Title>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
