"use client";
import Loading from "@/app/loading";
import { AuthContext } from "@/auth/AuthContext";
import Container from "@/Components/Container";
import Title from "@/Components/Title";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
motion;

const BookService = () => {
  const { user, loading } = use(AuthContext);
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [divisions, setDivisions] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [upazilas, setUpazilas] = useState(null);
  const [loader, setLoader] = useState(true);
  const router = useRouter();

  // form data & cost calculation
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const [cost, setCost] = useState(0);
  const [address, setAddress] = useState(0);

  useEffect(() => {
    if (!service) return;
    if (!district) return;
    if (hours && days && district === "Dhaka") {
      const charge = service.serviceCharge * hours * days;
      setCost(charge);
    } else {
      // 15% vat extra
      const serviceCharge = service.serviceCharge * 1.15;
      const charge = serviceCharge * hours * days;
      const roundedCharge = Math.round(charge);
      setCost(roundedCharge);
    }
  }, [hours, days, district, service]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/booking/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data || []);
        setLoader(false);
      })
      .catch(() => toast.error("Failed to load service"));
  }, [slug]);

  // fetch divisions
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/refs/heads/master/divisions/divisions.json"
    )
      .then((res) => res.json())
      .then((data) => setDivisions(data[2].data));
  }, []);

  // fetch districts
  useEffect(() => {
    if (!division) return;
    const selectedDivision = divisions?.find((d) => d.name === division);
    if (!selectedDivision) return;

    fetch(
      "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/refs/heads/master/districts/districts.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const filtered = data[2].data.filter(
          (d) => d.division_id === selectedDivision.id
        );
        setDistricts(filtered);
      });
  }, [division, divisions, districts]);

  // fetch upozilas
  useEffect(() => {
    if (!district) return;
    const selectedDistrict = districts?.find((d) => d.name === district);
    if (!selectedDistrict) return;

    fetch(
      "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/refs/heads/master/upazilas/upazilas.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const filtered = data[2].data.filter(
          (d) => d.district_id === selectedDistrict.id
        );
        setUpazilas(filtered);
      });
  }, [district, districts]);

  if (loading || loader) return <Loading />;
  if (!user) return router.push("/login");

  const handleBooking = async (e) => {
    e.preventDefault();

    const newBooking = {
      service,
      name: user?.name,
      email: user?.email,
      hours,
      days,
      cost,
      address,
      upazila,
      district,
      division,
      bookedAt: new Date().toISOString(),
      status: "Pending",
    };

    if (!newBooking) return;

    const bookingPromise = fetch(
      `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/booking/${user.email}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking),
      }
    ).then(async (res) => {
      if (!res.ok) throw new Error("Booking failed");
      return res.json();
    });

    toast.promise(bookingPromise, {
      loading: "Placing your booking...",
      success: "Booking placed successfully!",
      error: "Failed to place booking",
    });

    try {
      await bookingPromise;
      router.push("/my-bookings");
    } catch (err) {
      console.error(err);
    }
  };

  if (!service) return <Loading />;

  return (
    <div className="mt-8">
      <Container>
        {/* title */}
        <Title>
          <div>
            <h2>Book {service?.name} service</h2>
            <p className="text-gray-600 text-sm font-medium">
              {service?.shortDescription}
            </p>
          </div>
        </Title>

        <div className="grid lg:grid-cols-5 lg:gap-12 items-center mb-8">
          {/* image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="hidden lg:block col-span-2"
          >
            <img
              src={service?.image}
              alt="Caregiving service"
              className="w-full"
            />
          </motion.div>

          {/* register form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border-l-2 border-white/30 py-2 col-span-3"
          >
            <form
              onSubmit={handleBooking}
              className="mt-6 bg-[#5bb4b7] p-8 rounded-xl"
            >
              {/* name and email */}
              <div className="grid md:grid-cols-5 md:gap-8">
                <div className="form md:col-span-2 mt-8">
                  <input
                    type="text"
                    name="name"
                    value={user?.name}
                    className="input"
                    required
                  />
                  <label className="label">Name</label>
                </div>

                <div className="form md:col-span-3 mt-8">
                  <input
                    type="text"
                    name="email"
                    value={user?.email}
                    className="input"
                    required
                  />
                  <label className="label">Email Address</label>
                </div>
              </div>

              {/* hours and days */}
              <div className="grid md:grid-cols-2 md:gap-8">
                <div className="form mt-8">
                  <input
                    type="number"
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="input"
                    required
                    min={1}
                    max={12}
                  />
                  <label className="label">Hours per day</label>
                </div>

                <div className="form mt-8">
                  <input
                    type="number"
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="input"
                    required
                    min={1}
                    max={30}
                  />
                  <label className="label">Days</label>
                </div>
              </div>

              {/* ---------location---------- */}
              <div className="grid md:grid-cols-5 md:gap-8">
                {/* address */}
                <div className="form mt-8 md:col-span-3">
                  <input
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    className="input"
                    required
                  />
                  <label className="label">Address</label>
                </div>

                {/* division */}
                <div className="form mt-8 md:col-span-2">
                  <select
                    name="division"
                    className="input peer text-gray-400 focus:text-black"
                    required
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                  >
                    <option value="" disabled>
                      Select division
                    </option>

                    {divisions?.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <label className="label opacity-0 peer-focus:opacity-100 peer-valid:opacity-100 transition-all">
                    Select division
                  </label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 md:gap-8">
                {/* district */}
                <div className="form mt-8">
                  <select
                    name="division"
                    className="input peer text-gray-400 focus:text-black"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  >
                    <option value="" disabled>
                      Select district
                    </option>

                    {districts?.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <label className="label opacity-0 peer-focus:opacity-100 peer-valid:opacity-100 transition-all">
                    Select district
                  </label>
                </div>

                {/* upazila */}
                <div className="form mt-8">
                  <select
                    name="division"
                    className="input peer text-gray-400 focus:text-black"
                    required
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Upazila
                    </option>

                    {upazilas?.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <label className="label opacity-0 peer-focus:opacity-100 peer-valid:opacity-100 transition-all">
                    Select district
                  </label>
                </div>
              </div>

              {/* cost */}
              <div className="text-center mt-8  bg-white/20 p-4 rounded-sm relative">
                <span className="text-2xl md:text-4xl font-bold text-[#fc8298]">
                  Total cost: ৳{cost}
                </span>
                <span className="absolute text-xs px-2 text-white bg-[#fc8298] rounded-sm -top-2 left-4">
                  ৳{service.serviceCharge}/hour
                </span>
                {/* vat */}
                {district && district !== "Dhaka" && (
                  <span className="absolute text-xs px-2 text-white bg-[#fc8298] rounded-sm -top-2 left-22">
                    +15% Vat
                  </span>
                )}
              </div>

              {/* submit button */}
              <button
                disabled={!cost}
                className="btn-primary w-full mt-8 disabled:bg-[#fc8298]/40!"
              >
                Book service now
              </button>
            </form>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default BookService;
