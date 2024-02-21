import React, { useContext } from "react";
import GlobalContext from "../context/Context";
import {
  Button,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

const AddCourses = () => {
  const {
    teachingYear,
    setTeachingYear,
    postgradCourses,
    setPostGradCourses,
    undergradCourses,
    setUnderGradCourses,
  } = useContext(GlobalContext);

  const addCourses = async () => {
    if (teachingYear && (postgradCourses || undergradCourses)) {
      await setDoc(doc(db, "teaching", teachingYear), {
        teachingYear: parseInt(teachingYear, 10),
        postgradCourses,
        undergradCourses,
      });
      setTeachingYear("2021");
      setPostGradCourses("");
      setUnderGradCourses("");
    }
  };

  return (
    <div className="w-96 flex flex-col gap-5 mx-auto">
      <Typography className="text-center">Teaching Info</Typography>
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
      <Button onClick={() => addCourses()}>Add Courses</Button>
    </div>
  );
};

export default AddCourses;
