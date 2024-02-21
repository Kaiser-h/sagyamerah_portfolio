"use client";
import React, { useEffect, useRef } from "react";
import GlobalContext from "@/components/context/Context";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useContext } from "react";
import { Typography, slider } from "@material-tailwind/react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const ResearchSection = () => {
  const { researchs, researchMainOverview } = useContext(GlobalContext);

  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  const slideInYAnimationVarient = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  const slideInXAnimationVarient = {
    initial: {
      opacity: 0,
      x: -200,
    },
    animate: {
      opacity: 1,
      x: 0,
      once: true,
    },
    viewport: {
      once: true,
    },
  };

  return (
    <motion.section
      ref={targetRef}
      id="research"
      className="container mx-auto min-h-svh flex flex-col items-center justify-center text-secondary p-3"
    >
      <motion.div
        variants={slideInXAnimationVarient}
        initial="initial"
        whileInView="animate"
        viewport={{
          once: true,
        }}
        className="container flex flex-col flex-start mt-64 mb-20"
      >
        <Typography variant="h2">
          <span className="text-primary">Research Interest</span>
        </Typography>
        <Typography className="xl:w-6/12 text-justify">
          {researchMainOverview}
        </Typography>
      </motion.div>
      <motion.div
        variants={slideInYAnimationVarient}
        initial="initial"
        whileInView="animate"
        viewport={{
          once: true,
        }}
        className="container flex flex-col items-center justify-center"
      >
        {researchs.map((research, index) => (
          <div
            key={index}
            className="w-80svw lg:w-8/12 bg-dark mb-5 px-6 py-2 text-wrap"
          >
            <div className="mb-3">
              <span className="text-primary">
                <i>{research.type}. </i>
              </span>
              {research.overview}
            </div>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ResearchSection;
