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

const Login = () => {
  const { user, setUser, passwordSignin, googleSignIn, loading } =
    use(AuthContext);
  const router = useRouter();

  if (loading) return <Loading />;

  if (user) {
    router.push("/");
  }

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    const loginUser = async () => {
      const res = await passwordSignin(email, password);

      if (!res?.user?.accessToken) {
        throw new Error("Login failed");
      }

      const dbRes = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_DOMAIN
        }/user?email=${encodeURIComponent(email)}`
      );

      const userData = await dbRes.json();

      if (!userData) {
        throw new Error("User not found");
      }

      setUser(userData);
    };

    toast.promise(loginUser(), {
      loading: "Logging in...",
      success: "Login successful!",
      error: (err) => err.message || "Login failed",
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
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <Image src={heroImg} alt="Caregiving service" className="w-full" />
          </motion.div>

          {/* login form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border-l-2 border-white/30 py-2"
          >
            <div className="p-4 md:p-8 xl:p-12 bg-linear-to-r md:from-white/10">
              <h3 className="text-2xl md:text-4xl font-bold text-[#fc8298]">
                Welcome Back
              </h3>
              <p className="text-sm font-medium text-white">
                Login to continue managing your care services
              </p>

              <form onSubmit={handleLogin}>
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

              {/* divider */}
              <div className="my-6 flex items-center gap-4">
                <span className="flex-1 h-px bg-white/20"></span>
                <span className="text-sm text-[#fc8298]">OR</span>
                <span className="flex-1 h-px bg-white/20"></span>
              </div>

              {/* Google Login */}
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2 btn-primary w-full bg-transparent! border border-white/40 hover:bg-white/30!"
              >
                <FcGoogle size={20} />
                Continue with Google
              </button>

              <p className="text-white text-sm font-medium text-center mt-4 md:mt-8">
                Already have account?{" "}
                <Link
                  href={"/register"}
                  className="text-[#fc8298] font-semibold"
                >
                  Register
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Login;
