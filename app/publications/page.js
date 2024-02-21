"use client";
import React, { useRef } from "react";
import GlobalContext from "@/components/context/Context";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { db } from "@/app/firebase";
import { motion } from "framer-motion";

const PublicationSection = () => {
  const { publications } = useContext(GlobalContext);

  const targetRef = useRef(null);

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

  // const handleSort = (arr) => {
  //   return arr.sort((a, b) => b.createdAt - a.createdAt);
  // };

  return (
    <section
      ref={targetRef}
      id="publications"
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
          <span className="text-primary">Publications</span>
        </Typography>
        <Typography>Some selected publications</Typography>
      </motion.div>
      <div className="container flex flex-col items-center justify-center">
        {publications.map((mItem, mIndex) => (
          <div key={mIndex} className="w-80svw lg:w-8/12 px-6 py-2 mb-20">
            <div className="mb-3">
              <Typography variant="h6" className="text-primary">
                <i>{mItem.type}.</i>
              </Typography>
            </div>
            {mItem.publications?.map((item, index) => {
              const tempContainer = document.createElement("div");
              tempContainer.innerHTML = item.cite;

              const anchorTags = tempContainer.querySelectorAll("a");
              anchorTags.forEach((anchorTag) => {
                anchorTag.setAttribute("target", "_blank");
                anchorTag.setAttribute("rel", "noopener noreferrer");
              });

              return (
                <motion.div
                  variants={slideInYAnimationVarient}
                  initial="initial"
                  whileInView="animate"
                  viewport={{
                    once: true,
                  }}
                  className="mb-2 p-4 bg-dark text-wrap"
                >
                  <div
                    className="pub"
                    key={index}
                    dangerouslySetInnerHTML={{
                      __html: tempContainer.innerHTML,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PublicationSection;
