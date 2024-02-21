import { Inter } from "next/font/google";
import "./globals.css";
import GlobalContextProvider from "../components/provider/ContextProvider";

import { ThemeProvider } from "../components/tailwindComponents/TailwindComponents";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Samuel | Personal Portfolio",
  description:
    "Samuel is currently a Postdoctoral fellow at the University of Waterloo, Canada with expertise in applying cutting-edge statistical, actuarial, machine learning techniques to finance, risk, and insurance for the development of holistic risk-based systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <GlobalContextProvider>
            <Navbar />
            {children}
            <Footer />
          </GlobalContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
