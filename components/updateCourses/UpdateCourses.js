import React, { useContext } from "react";
import GlobalContext from "../context/Context";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

const UpdateCourses = () => {
  const {
    teachingYear,
    setTeachingYear,
    postgradCourses,
    setPostGradCourses,
    undergradCourses,
    setUnderGradCourses,

    showUpdateCoursesDialog,
    setShowUpdateCoursesDialog,
  } = useContext(GlobalContext);

  const updateCourses = async () => {
    if (teachingYear && (postgradCourses || undergradCourses)) {
      await updateDoc(doc(db, "teaching", teachingYear), {
        teachingYear: parseInt(teachingYear, 10),
        postgradCourses,
        undergradCourses,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setTeachingYear("2021");
    setPostGradCourses("");
    setUnderGradCourses("");
    setShowUpdateCoursesDialog(false);
  };

  return (
    <>
      <Dialog open={showUpdateCoursesDialog} handler={handleClose}>
        <DialogHeader>Edit Courses</DialogHeader>
        <DialogBody>
          <div className="w-96 flex flex-col gap-5 mx-auto">
            <Select
              label="Select Year"
              value={teachingYear}
              onChange={(newValue) => setTeachingYear(newValue)}
            >
              {[
                "2021",
                "2022",
                "2023",
                "2024",
                "2025",
                "2026",
                "2027",
                "2028",
                "2029",
                "2030",
              ].map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
            <Textarea
              required
              label="PostGraduate Courses"
              value={postgradCourses}
              className="w-full p-4 mb-4 outline-none"
              onChange={(e) => setPostGradCourses(e.target.value)}
            />
            <Textarea
              required
              label="UnderGraduate Courses"
              value={undergradCourses}
              className="w-full p-4 mb-4 outline-none"
              onChange={(e) => setUnderGradCourses(e.target.value)}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => updateCourses()}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default UpdateCourses;
