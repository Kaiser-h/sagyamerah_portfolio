"use client";
import React from "react";
import GlobalContext from "@/components/context/Context";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { db } from "@/app/firebase";
import { motion, useInView } from "framer-motion";

const SupervisionSection = () => {
  const { supervisions, setSupervisions } = useContext(GlobalContext);

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

  const orderOfSupervisionTypes = ["PhD", "Masters", "Undergraduate"];

  const handleSupervisionSort = (arr) => {
    return arr.sort((a, b) => {
      const typeA = orderOfSupervisionTypes.indexOf(a.supervisionType);
      const typeB = orderOfSupervisionTypes.indexOf(b.supervisionType);
      return typeA - typeB;
    });
  };

  return (
    <section
      id="supervisions"
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
          <span className="text-primary">Supervisions</span>
        </Typography>
        <Typography>Some selected research supervisions</Typography>
      </motion.div>
      {handleSupervisionSort(supervisions)?.map((mItem, mIndex) => (
        <div key={mIndex} className="w-svw lg:w-8/12 px-6 py-2 mb-20">
          <div className="mb-3">
            <span className="text-primary">
              <i>{mItem.type}</i> students
            </span>
          </div>
          {mItem.supervisions.map((item, index) => (
            <motion.div
              key={index}
              variants={slideInYAnimationVarient}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className="mb-2 p-4 bg-dark"
            >
              {item.cite}
            </motion.div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default SupervisionSection;
