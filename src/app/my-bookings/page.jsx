"use client";
import { AuthContext } from "@/auth/AuthContext";
import Container from "@/Components/Container";
import Title from "@/Components/Title";
import React, { use, useEffect, useState } from "react";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiOutlineClipboardList } from "react-icons/hi";

const MyBookings = () => {
  const { user, loading } = use(AuthContext);
  const [loader, setLoader] = useState(true);
  const [bookings, setBookings] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/bookings/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoader(false);
      });
  }, [user]);

  if (loading || loader) return <Loading />;
  if (!user) return router.push("/login");

  const handleCancel = (id) => {
    const cancelPromise = fetch(
      `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/booking/cancel/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled" }),
      }
    ).then(async (res) => {
      if (!res.ok) throw new Error("Failed to cancel booking");
      await res.json();
      setBookings(
        bookings.map((b) => (b._id === id ? { ...b, status: "Cancelled" } : b))
      );
    });

    toast.promise(cancelPromise, {
      loading: "Cancelling booking...",
      success: "Booking cancelled successfully!",
      error: "Failed to cancel booking",
    });
  };

  return (
    <div className="my-8">
      <Container>
        {/* title */}
        <Title>
          <div>
            <h2>My Bookings</h2>
            <p className="text-gray-600 text-sm font-medium">
              View and manage your caregiving service bookings.
            </p>
          </div>
        </Title>

        {/* bookings UI */}
        <div className="mt-8 grid xl:grid-cols-2 gap-6">
          {bookings.length === 0 && (
            <div className="xl:col-span-2 flex flex-col items-center justify-center py-16 bg-linear-to-br from-red-50 to-pink-50 rounded-2xl border border-red-100 shadow-sm">
              <HiOutlineClipboardList className="text-6xl text-red-300 mb-4" />

              <h3 className="text-xl font-bold text-red-400">
                No bookings found
              </h3>

              <p className="mt-2 text-sm text-red-300 text-center max-w-sm">
                You haven’t booked any services yet.
              </p>
            </div>
          )}
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-[#5bb4b7] rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {b.service.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                  Duration: {b.hours} hrs/day for {b.days} days
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                  Location: {b.address}, {b.district}
                </p>
                <p className="text-lg font-semibold bg-white mt-2 w-fit px-4 py-1 rounded-xs text-[#fc8298]">
                  Total Cost: ৳{b.cost}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs font-bold rounded-xs ${
                    b.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : b.status === "Confirmed"
                      ? "bg-green-100 text-green-800"
                      : b.status === "Cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  Status: {b.status}
                </span>
              </div>

              <div className="flex sm:flex-col gap-3 mt-4 md:mt-0 text-nowrap">
                <Link
                  href={`/services/${b.service.id}`}
                  className="btn-primary bg-transparent! hover:bg-white! hover:text-[#5bb4b7]! border border-white! text-center"
                >
                  View Details
                </Link>
                {b.status !== "Cancelled" && b.status !== "Completed" && (
                  <button
                    className="bg-red-500! hover:bg-red-400! btn-primary"
                    onClick={() => handleCancel(b._id)}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default MyBookings;
