"use client";
import Container from "@/Components/Container";
import Image from "next/image";
import React from "react";
import heroImg from "../../../../public/hero.png";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const isEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(isEmail)) {
      toast.error("Please Enter Valid Email");
      return;
    }
    console.log({ email, password });
  };

  return (
    <section className="bg-[#5bb4b7] flex items-center py-8 md:py-16">
      <Container>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* image */}
          <div className="hidden md:block">
            <Image src={heroImg} alt="Caregiving service" className="w-full" />
          </div>

          {/* login form */}
          <div className="border-l-2 border-white/30 py-2">
            <div className="p-4 md:p-8 xl:p-12 bg-linear-to-r md:from-white/10">
              <h3 className="text-2xl md:text-4xl font-bold text-[#fc8298]">
                Welcome Back
              </h3>
              <p className="text-sm font-medium text-white">
                Login to continue managing your care services
              </p>
              <form onSubmit={handleLogin}>
                {" "}
                {/* email */}
                <div className="form mt-4 md:mt-8">
                  <input type="text" name="email" className="input" required />
                  <label className="label">Enter Your Email</label>
                </div>
                {/* password */}
                <div className="form mt-4 md:mt-8">
                  <input
                    type="password"
                    name="password"
                    className="input"
                    required
                  />
                  <label className="label">Enter Your Password</label>
                </div>
                {/* login btn */}
                <button className="btn-primary w-full mt-4 md:mt-8">
                  Login
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <span className="flex-1 h-px bg-white/20"></span>
                <span className="text-sm text-[#fc8298]">OR</span>
                <span className="flex-1 h-px bg-white/20"></span>
              </div>

              {/* Google Login */}
              <button className="flex items-center justify-center gap-2 btn-primary w-full bg-transparent! border border-white/40 hover:bg-white/30!">
                <FcGoogle size={20} />
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Login;
