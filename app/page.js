"use client";
import GlobalContext from "@/components/context/Context";
import { useContext, useEffect } from "react";
import HomeSection from "@/components/HomeSection";

// import { motion } from "framer-motion";

export default function Home() {
  const { setActiveSection } = useContext(GlobalContext);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll("section");

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop - 40 && // Adjust the offset as needed
          scrollPosition < sectionTop + sectionHeight - 50 // Adjust the offset as needed
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <main className="flex flex-col justify-center">
        <HomeSection />
      </main>
    </>
  );
}
