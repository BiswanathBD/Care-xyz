import Container from "@/Components/Container";
import Title from "@/Components/Title";
import Image from "next/image";
import Link from "next/link";
  import { FaFaceSadTear } from "react-icons/fa6";

// Fetch all services
const getServices = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/services`);

  if (!res.ok) throw new Error("Failed to load services");
  return res.json();
};

// Dynamic SEO metadata
export async function generateMetadata({ params }) {
  const services = await getServices();
  const { slug } = await params;
  const service = await services.find((s) => s.id === slug);

  if (!service) {
    return {
      title: "Service Not Found | Care.xyz",
      description: "The requested service could not be found on Care.xyz.",
    };
  }

  return {
    title: `${service.name} | Care.xyz`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.name} | Care.xyz`,
      description: service.shortDescription,
      url: `https://care.xyz/service/${service.id}`,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} | Care.xyz`,
      description: service.shortDescription,
      images: [service.image],
    },
  };
}

export default async function ServiceDetails({ params }) {
  const services = await getServices();
  const { slug } = await params;
  const service = await services.find((s) => s.id === slug);


  if (!service) {
    return (
      <Container>
        <div className="py-12 flex flex-col justify-center items-center">
          <FaFaceSadTear size={48} color="#5bb4b780"/>
          <h1 className="text-2xl text-gray-300 font-bold mt-4">
            Service Not Found
          </h1>
          <div className="mt-6">
            <Link href="/" className="btn-primary px-6 py-2">
              Go Back Home
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <section className="py-16">
      <Container>
        <Title>
          <h2>Service Details</h2>
          <p className="text-gray-600 text-sm font-medium">
            Comprehensive details and features of the selected caregiving
            service.
          </p>
        </Title>

        <div className="grid lg:grid-cols-5 gap-10 items-center mt-10">
          {/* Image */}
          <div className="relative w-full aspect-square overflow-hidden lg:col-span-2">
            <Image
              src={service.image}
              alt={service.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-6 lg:col-span-3">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              {service.name}
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed">
              {service.description}
            </p>

            {/* Features */}
            <ul className="grid sm:grid-cols-2 gap-3">
              {service.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <span className="text-[#fc8298]">✔</span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Price */}
            <div className="text-xl font-semibold text-[#5bb4b7]">
              From ৳{service.serviceCharge}/{service.unit}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <Link
                href="/services"
                className="btn-secondary text-center w-2/4 bg-white! text-[#5bb4b7]! border border-[#5bb4b7] hover:bg-[#5bb4b7]! hover:text-white!"
              >
                Go Back
              </Link>

              <Link
                href={`/booking/${service.id}`}
                className="btn-primary w-full text-center"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
