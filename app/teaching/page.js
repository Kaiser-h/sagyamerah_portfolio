"use client";
import React from "react";
import GlobalContext from "@/components/context/Context";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { db } from "@/app/firebase";
import { motion, useInView } from "framer-motion";

const TeachingSection = () => {
  const { courses, setCourses } = useContext(GlobalContext);

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

  useEffect(() => {
    const q = query(collection(db, "teaching"));
    const unsub = onSnapshot(q, (snapshot) => {
      let shots = snapshot.docs.map((doc) => doc.data());
      let sortedShots = shots.sort((a, b) => b.teachingYear - a.teachingYear);
      setCourses(sortedShots);
    });
    return () => unsub;
  }, []);

  return (
    <section
      id="teaching"
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
          <span className="text-primary">Teaching</span>
        </Typography>
      </motion.div>
      {courses.map((item, index) => (
        <motion.div
          variants={slideInYAnimationVarient}
          initial="initial"
          whileInView="animate"
          viewport={{
            once: true,
          }}
          key={index}
          className="w-svw lg:w-8/12 px-6 py-2 mb-20"
        >
          <div className="mb-3">
            <span className="text-primary">
              <i>{item.teachingYear}</i>
            </span>
          </div>
          <div className="mb-2 p-4 bg-dark">
            {item.postgradCourses && (
              <p className="mb-2">
                <span className="text-primary">
                  <i>Postgraduate Courses: </i>
                </span>
                {item.postgradCourses}
              </p>
            )}
            {item.undergradCourses && (
              <p>
                <span className="text-primary">
                  <i>Undergraduate Courses: </i>
                </span>
                {item.undergradCourses}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default TeachingSection;
