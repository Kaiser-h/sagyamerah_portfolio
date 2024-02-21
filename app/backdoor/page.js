"use client";
import React, {
  Suspense,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import GlobalContext from "../../components/context/Context";
import { redirect } from "next/navigation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import {
  Button,
  Input,
  Option,
  Select,
  Step,
  Stepper,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import useDebounce from "../../components/hooks/useDebounce";
import Loading from "../../components/pageLoading/PageLoading";

import AddCourses from "@/components/addCourses/AddCourses";
import AddSupervisions from "@/components/addSupervisions/AddSupervisions";
import AddPublicationTypeAndOverview from "@/components/addPublications/addPublicationTypeAndOverview";
import AddPublication from "@/components/addPublications/addPublication";
import Courses from "@/components/courses/Courses";

import dynamic from "next/dynamic";
import UpdateCourses from "@/components/updateCourses/UpdateCourses";
import Supervisions from "@/components/supervisions/Supervisions";
import UpdateSupervisions from "@/components/updateSupervisions/UpdateSupervisions";
import PublicationsTypeAndOverview from "@/components/publications/PublicationsTypeAndOverview";
import UpdatePublicationTypeAndOverview from "@/components/updatePublications/UpdatePublicationTypeAndOverview";
import Publications from "@/components/publications/Publications";
import UpdatePublication from "@/components/updatePublications/UpdatePublication";
import AddResearchInterests from "@/components/addResearchInterests/addResearchInterests";
import ResearchInterests from "@/components/researchs/ReseachInterests";
import UpdateResearchInterests from "@/components/updateResearchInterests/updateResearchInterests";
import DashboardLoarding from "@/components/dashboardLoarding/DashboardLoarding";

const CustomEditor = dynamic(
  () => {
    return import("@/components/customEditor/CustomEditor");
  },
  { ssr: false }
);

const Backdoor = () => {
  const {
    logout,
    cv,
    setCV,
    picture,
    setPicture,
    scholarLink,
    setScholarLink,
    ORCID,
    setORCID,
    researchGate,
    setResearchGate,
    about,
    setAbout,

    researchMainOverview,
    setResearchMainOverview,

    authState,
    userDataStatus,
  } = useContext(GlobalContext);

  const [showProgress, setShowProgress] = useState(false);

  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const scholarDebouncedValue = useDebounce(scholarLink, 1000);
  const ORCIDDebouncedValue = useDebounce(ORCID, 1000);
  const researchGateDebouncedValue = useDebounce(researchGate, 1000);
  const aboutDebouncedValue = useDebounce(about, 1000);
  const researchDebouncedValue = useDebounce(researchMainOverview, 1000);

  const handleNext = async () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const handlePDFChange = async (e) => {
    setShowProgress(true);
    const file = e.target.files[0];

    const storageRef = ref(storage, `cv.pdf`);

    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (downloadURL) => {
        setCV([file.name, downloadURL]);
        setShowProgress(false);
        await updateDoc(doc(db, "user", "user"), {
          cv: [file.name, downloadURL],
        });
      });
    });
  };

  const handleImgChange = async (e) => {
    setShowProgress(true);
    const file = e.target.files[0];

    const storageRef = ref(storage, `${file.name}`);

    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (downloadURL) => {
        setPicture([file.name, downloadURL]);
        setShowProgress(false);
        await updateDoc(doc(db, "user", "user"), {
          picture: [file.name, downloadURL],
        });
      });
    });
  };

  useEffect(() => {
    if (authState === "unauthenticated") {
      redirect("/login");
    }
  }, [authState]);

  const saveToDataBase = async (value, field) => {
    await updateDoc(doc(db, "user", "user"), {
      [`${field}`]: value,
    });
  };

  useEffect(() => {
    if (scholarDebouncedValue) {
      saveToDataBase(scholarDebouncedValue, "scholar");
    }
  }, [scholarDebouncedValue]);

  useEffect(() => {
    if (ORCIDDebouncedValue) {
      saveToDataBase(ORCIDDebouncedValue, "ORCID");
    }
  }, [ORCIDDebouncedValue]);

  useEffect(() => {
    if (ORCIDDebouncedValue) {
      saveToDataBase(ORCIDDebouncedValue, "ORCID");
    }
  }, [ORCIDDebouncedValue]);

  useEffect(() => {
    if (researchGateDebouncedValue) {
      saveToDataBase(researchGateDebouncedValue, "researchGate");
    }
  }, [researchGateDebouncedValue]);

  useEffect(() => {
    if (aboutDebouncedValue) {
      saveToDataBase(aboutDebouncedValue, "about");
    }
  }, [aboutDebouncedValue]);

  useEffect(() => {
    if (researchDebouncedValue) {
      saveToDataBase(researchDebouncedValue, "researchMainOverview");
    }
  }, [researchDebouncedValue]);

  return (
    <div className="min-h-[50rem]">
      {authState === "pending" && <Loading />}
      {authState === "authenticated" && userDataStatus === "loading" && (
        <DashboardLoarding />
      )}
      {authState === "authenticated" && userDataStatus === "hasData" && (
        <div className="w-screen">
          <div className="container flex mx-auto my-3">
            <div className="flex items-center justify-between w-svw text-white">
              <h1 className="text-[25px]">BACKDOOR</h1>
              <button className="bg-black p-4" onClick={() => logout()}>
                Logout
              </button>
            </div>
          </div>
          <div className="container flex flex-col items-center justify-center mx-auto mt-20 gap-8">
            <div className="w-96 lg:w-1/2 bg-white px-6 py-2 rounded-full">
              <Stepper
                activeStep={activeStep}
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
              >
                <Step onClick={() => setActiveStep(0)}>1</Step>
                <Step onClick={() => setActiveStep(1)}>2</Step>
                <Step onClick={() => setActiveStep(2)}>3</Step>
                <Step onClick={() => setActiveStep(3)}>4</Step>
                <Step onClick={() => setActiveStep(4)}>5</Step>
                <Step onClick={() => setActiveStep(5)}>6</Step>
              </Stepper>
            </div>

            <div className="w-96 lg:w-1/2 bg-white p-4 rounded-lg mb-6">
              {activeStep === 0 && (
                <div className="w-96 flex flex-col gap-5 mx-auto">
                  <Typography className="text-center">Basic Info</Typography>
                  <input
                    className="hidden"
                    type="file"
                    id="cvfile"
                    multiple
                    onChange={(e) => handlePDFChange(e)}
                  />
                  <label
                    htmlFor="cvfile"
                    className="block bg-black text-white py-2 text-center cursor-pointer rounded-md"
                  >
                    {cv?.length > 0 ? cv[0] : "Add CV(PDF)"}
                    {showProgress && "..."}
                  </label>
                  <input
                    className="hidden"
                    type="file"
                    id="imgfile"
                    multiple
                    onChange={(e) => handleImgChange(e)}
                  />
                  <label
                    htmlFor="imgfile"
                    className="block bg-black text-white py-2 text-center cursor-pointer rounded-md"
                  >
                    {picture?.length > 0 ? picture[0] : "Add Picture"}
                    {showProgress && "..."}
                  </label>
                  <Input
                    required
                    label="Google Scholar Link"
                    value={scholarLink}
                    className="w-full p-4 mb-4 outline-none"
                    onChange={(e) => setScholarLink(e.target.value)}
                  />
                  <Input
                    required
                    label="ORCID Link"
                    value={ORCID}
                    className="w-full p-4 mb-4 outline-none"
                    onChange={(e) => setORCID(e.target.value)}
                  />
                  <Input
                    required
                    label="ResearchGate Link"
                    value={researchGate}
                    className="w-full p-4 mb-4 outline-none"
                    onChange={(e) => setResearchGate(e.target.value)}
                  />
                  <Textarea
                    required
                    rows="12"
                    label="Research Interest"
                    value={about}
                    className="w-full p-4 mb-4 outline-none"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>
              )}
              {activeStep === 1 && (
                <div className="w-96 flex flex-col gap-5 mx-auto">
                  <Typography className="text-center">Research Info</Typography>
                  <Textarea
                    required
                    rows="5"
                    label="Research Interest Overview"
                    value={researchMainOverview}
                    className="w-full p-4 mb-4 outline-none"
                    onChange={(e) => setResearchMainOverview(e.target.value)}
                  />

                  <div className="border-b-2 w-[100%]" />
                  <Typography>Add Interest</Typography>
                  <AddResearchInterests />
                </div>
              )}
              {activeStep === 2 && <AddCourses />}
              {activeStep === 3 && <AddSupervisions />}
              {activeStep === 4 && <AddPublicationTypeAndOverview />}
              {activeStep === 5 && <AddPublication />}
              <div className="mt-16 flex justify-between">
                <Button onClick={handlePrev} disabled={isFirstStep}>
                  Prev
                </Button>
                <Button onClick={handleNext} disabled={isLastStep}>
                  Next
                </Button>
              </div>
            </div>
            {activeStep === 1 && <ResearchInterests />}
            {activeStep === 2 && <Courses />}
            {activeStep === 3 && <Supervisions />}
            {activeStep === 4 && <PublicationsTypeAndOverview />}
            {activeStep === 5 && <Publications />}
          </div>
        </div>
      )}
      <UpdateCourses />
      <UpdateSupervisions />
      <UpdatePublicationTypeAndOverview />
      <UpdatePublication />
      <UpdateResearchInterests />
    </div>
  );
};

export default Backdoor;
