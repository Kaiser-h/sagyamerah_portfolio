"use client";
import React, { useContext, useRef } from "react";
import GlobalContext from "@/components/context/Context";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";

const HomeSection = () => {
  const {
    picture,
    cv,
    scholarLink,
    ORCID,
    researchGate,
    about,

    userDataStatus,
    imageLoaded,
    setImageLoaded,
  } = useContext(GlobalContext);

  const targetRef = useRef();

  return (
    <motion.section
      ref={targetRef}
      id="home"
      className="container mx-auto flex xl:min-h-svh items-center justify-center p-3"
    >
      {userDataStatus === "loading" && <Spinner />}
      {userDataStatus === "hasData" && (
        <div className="flex flex-col">
          <div
            className={`container flex flex-col-reverse xl:flex-row  items-center justify-between gap-5 xl:gap-40 mt-64 xl:mb-20`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 1,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              className="w-svw xl:w-8/12 h-200svh text-light p-3"
            >
              <Typography className="mb-20 text-[20px]">
                <i>
                  “Don’t make excuses for why you can’t get it done.
                  <strong className="text-primary"> Focus</strong> on all the
                  reasons why you must make it happen”
                </i>
                -Ralph Marston
              </Typography>
              <Typography variant="h1" className="text-[40px] xl:text-10xl">
                About
              </Typography>

              <Typography className="text-justify py-5 text-secondary">
                {about}
              </Typography>
              <div className="flex flex-wrap gap-3 mb-5">
                <a target="_blank" href={cv[1]}>
                  <Button
                    variant="outlined"
                    color="white"
                    className="rounded-full"
                  >
                    CV
                  </Button>
                </a>
                <a target="_blank" href={scholarLink}>
                  <Button
                    variant="outlined"
                    color="white"
                    className="rounded-full"
                  >
                    Google Scholar
                  </Button>
                </a>
                <a target="_blank" href={ORCID}>
                  <Button
                    variant="outlined"
                    color="white"
                    className="rounded-full"
                  >
                    ORCID
                  </Button>
                </a>
                <a target="_blank" href={researchGate}>
                  <Button
                    variant="outlined"
                    color="white"
                    className="rounded-full"
                  >
                    ResearchGate
                  </Button>
                </a>
              </div>
              <div className="bg-dark text-secondary p-4 flex flex-col xl:flex-row gap-3 rounded-xl">
                <div className="">
                  <Typography className="text-primary">Office</Typography>
                  <Typography>Room 3234</Typography>
                  <Typography>M3-300 University Avenue West,</Typography>
                  <Typography>Waterloo, ON, N2L 3G1, Canada</Typography>
                </div>
                <div className="">
                  <Typography className="text-primary">Tel</Typography>
                  <Typography>519-888-4567 ext 31132</Typography>
                </div>
                <div className="">
                  <Typography className="text-primary">Email</Typography>
                  <Typography>gyamerah@uwaterloo.ca</Typography>
                  <Typography>saasgyam@gmail.com</Typography>
                </div>
              </div>
            </motion.div>
            <div>
              {picture && (
                <motion.img
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 1,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                  src={picture[1]}
                  className={`rounded-full w-[18rem] xl:w-[30rem] ${
                    imageLoaded && "border-8 border-solid border-primary"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col xl:flex-row gap-5 mt-5">
            <div className="bg-dark text-secondary p-4 flex flex-col gap-3 rounded-xl xl:w-5/12">
              <Typography variant="h6" className="text-primary">
                Diversity of Education Experience
              </Typography>
              <Typography>
                Samuel's educational background includes a diverse range of
                disciplines such as Statistics, Mathematics, finance, computer
                and actuarial science. I have a Doctor of Philosophy degree
                (Ph.D) in financial mathematics, a Master's degree in applied
                mathematics, and a Bachelor's degree in mathematics and
                statistics.
              </Typography>
            </div>
            <div className="bg-dark text-secondary p-4 flex flex-col gap-3 rounded-xl xl:w-4/12">
              <Typography variant="h6" className="text-primary">
                Industrial Partnership
              </Typography>
              <Typography>
                Samuel has extensive experience working with different
                statistical and financial analysis tools. I am enthusiastic
                about bringing a unique blend of practical industry experience
                and academic rigor to industries.
              </Typography>
            </div>
            <div className="bg-dark text-secondary p-4 flex flex-col gap-3 rounded-xl xl:w-3/12">
              <Typography variant="h6" className="text-primary">
                News
              </Typography>
              <Typography>2024-01-01</Typography>
              <Typography>
                [Doctoral Supervision] Samuel is currently accepting students
                for PhD supervision.
              </Typography>
            </div>
          </div>
        </div>
      )}
      {userDataStatus === "hasNoData" && <div>You might be offline.</div>}
    </motion.section>
  );
};

export default HomeSection;
