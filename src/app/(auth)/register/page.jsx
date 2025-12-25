"use client";
import Container from "@/Components/Container";
import Image from "next/image";
import React, { use } from "react";
import heroImg from "../../../../public/hero.png";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import Link from "next/link";
import { AuthContext } from "@/auth/AuthContext";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { motion } from "framer-motion";
motion;

const Register = () => {
  const { user, setUser, passwordSignUp, googleSignIn, loading } =
    use(AuthContext);
  const router = useRouter();

  if (loading) {
    return <Loading />;
  }
  if (user) {
    return router.push("/");
  }

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    const newUser = {
      nid: form.nid.value.trim(),
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      contact: form.contact.value.trim(),
    };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    // number validation
    if (newUser.contact.length !== 11) {
      toast.error("Enter valid Bangladeshi number");
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Invalid Password");
      return;
    }

    // confirm password validation
    if (password !== confirmPassword) {
      toast.error("Passwords not matched");
      return;
    }

    const registerUser = async () => {
      const res = await passwordSignUp(newUser.email, password);

      if (!res?.user?.accessToken) {
        throw new Error("Authentication failed");
      }

      const saveRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        }
      );

      const data = await saveRes.json();

      if (!data?.insertedId) {
        throw new Error("User not saved");
      }

      const userRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/user?email=${res.user.email}`
      );
      const userData = await userRes.json();

      setUser(userData);
    };

    toast.promise(registerUser(), {
      loading: "Creating account...",
      success: "Registration successful!",
      error: (err) => err.message || "Registration failed",
    });
  };

  const handleGoogleLogin = () => {
    const googleLoginFlow = async () => {
      const res = await googleSignIn();
      const user = res.user;

      const newUser = {
        name: user.displayName || "",
        email: user.email,
        contactNo: user.phoneNumber || "",
        NID_No: "",
      };

      const saveRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        }
      );

      const saveData = await saveRes.json();

      const userRes = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_DOMAIN
        }/user?email=${encodeURIComponent(user.email)}`
      );
      const userData = await userRes.json();

      setUser(userData);
    };

    toast.promise(googleLoginFlow(), {
      loading: "Signing in with Google...",
      success: "Login successful!",
      error: (err) => err.message || "Google login failed",
    });
  };

  return (
    <section className="bg-[#5bb4b7] flex items-center py-8 md:py-16">
      <Container>
        <div className="grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <Image src={heroImg} alt="Caregiving service" className="w-full" />
          </motion.div>

          {/* register form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border-l-2 border-white/30 py-2"
          >
            <div className="p-4 md:p-8 xl:p-12 bg-linear-to-r md:from-white/10">
              <h3 className="text-2xl md:text-4xl font-bold text-[#fc8298]">
                Create Account
              </h3>
              <p className="text-sm font-medium text-white">
                Register to start booking trusted care services
              </p>

              <form onSubmit={handleRegister} className="mt-6">
                {/* Name & Email */}
                <div className="grid md:grid-cols-5 md:gap-8">
                  <div className="form md:col-span-2 mt-8">
                    <input type="text" name="name" className="input" required />
                    <label className="label">Full Name</label>
                  </div>
                  <div className="form md:col-span-3 mt-8">
                    <input
                      type="text"
                      name="email"
                      className="input"
                      required
                    />
                    <label className="label">Email Address</label>
                  </div>
                </div>

                {/* Phone & NID */}
                <div className="grid md:grid-cols-2 md:gap-8">
                  <div className="form mt-8">
                    <input
                      type="tel"
                      name="contact"
                      className="input"
                      required
                    />
                    <label className="label">Contact Number</label>
                  </div>
                  <div className="form mt-8">
                    <input type="text" name="nid" className="input" required />
                    <label className="label">NID Number</label>
                  </div>
                </div>

                {/* Password & Confirm Password */}
                <div className="grid md:grid-cols-2 md:gap-8">
                  <div className="form mt-8">
                    <input
                      type="password"
                      name="password"
                      className="input"
                      required
                    />
                    <label className="label">Password</label>
                  </div>
                  <div className="form mt-8">
                    <input
                      type="password"
                      name="confirmPassword"
                      className="input"
                      required
                    />
                    <label className="label">Confirm Password</label>
                  </div>
                </div>

                {/* Register button */}
                <button className="btn-primary w-full mt-8">Register</button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <span className="flex-1 h-px bg-white/20"></span>
                <span className="text-sm text-[#fc8298]">OR</span>
                <span className="flex-1 h-px bg-white/20"></span>
              </div>

              {/* Google Register */}
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2 btn-primary w-full bg-transparent! border border-white/40 hover:bg-white/30!"
              >
                <FcGoogle size={20} />
                Continue with Google
              </button>

              {/* Go to Login */}
              <p className="mt-6 text-sm text-center text-white">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#fc8298] font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Register;
