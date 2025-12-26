import Container from "@/Components/Container";
import ServiceCard from "@/Components/ServiceCard";
import Title from "@/Components/Title";

const getServices = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/services`);

  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }

  return res.json();
};

export default async function Services() {
  const services = await getServices();

  return (
    <section className="py-16">
      <Container>
        <Title>
          <h2>Our Services</h2>
          <p className="text-gray-600 text-sm font-medium">
            Compassionate care for your loved ones, when you need it most
          </p>
        </Title>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 justify-center gap-8 mt-8">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} i={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
