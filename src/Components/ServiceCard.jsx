"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
motion;

export default function ServiceCard({ service, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 * i, ease: "easeOut" }}
      className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row"
    >
      {/* Image */}
      <div className="relative w-full md:w-1/3 aspect-square md:aspect-auto">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between w-full md:w-2/3">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-gray-800">{service.name}</h2>

          <p className="text-gray-600 text-sm leading-relaxed">
            {service.shortDescription}
          </p>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between pt-4">
          <span className="text-[#fc8298] font-semibold">
            ৳{service.serviceCharge}/h
          </span>

          <Link
            href={`/services/${service.id}`}
            className="text-nowrap btn-secondary"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
