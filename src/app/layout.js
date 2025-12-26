import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/auth/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const generateMetadata = ({ title, description }) => {
  return {
    title: title ? `${title} | Care.xyz` : "Care.xyz | Trusted Care Services",
    description:
      description ||
      "Find reliable babysitting, elderly, and home care services tailored to your needs, with verified caregivers and secure bookings.",
    openGraph: {
      title: title ? `${title} | Care.xyz` : "Care.xyz | Trusted Care Services",
      description:
        description ||
        "Find reliable babysitting, elderly, and home care services tailored to your needs, with verified caregivers and secure bookings.",
      url: "https://care-xyz-plum.vercel.app/",
      siteName: "Care.xyz",
      type: "website",
      images: [
        {
          url: "https://i.ibb.co.com/Swyh2MXD/image.png",
          width: 1200,
          height: 630,
          alt: "Care.xyz – Trusted Care Services",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | Care.xyz` : "Care.xyz | Trusted Care Services",
      description:
        description ||
        "Find reliable babysitting, elderly, and home care services tailored to your needs, with verified caregivers and secure bookings.",
      images: ["https://i.ibb.co.com/twXP1jQT/image.png"],
    },
  };
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <Navbar />
          <div className="grow">{children}</div>

          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
