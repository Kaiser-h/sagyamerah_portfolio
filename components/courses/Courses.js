import React, { useContext } from "react";
import GlobalContext from "../context/Context";
import { Button } from "@material-tailwind/react";

const Courses = () => {
  const {
    courses,
    setTeachingYear,
    setPostGradCourses,
    setUnderGradCourses,
    setShowUpdateCoursesDialog,
  } = useContext(GlobalContext);

  const handleUpdate = (item) => {
    setTeachingYear(item.teachingYear.toString());
    setPostGradCourses(item.postgradCourses);
    setUnderGradCourses(item.undergradCourses);
    setShowUpdateCoursesDialog(true);
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      {courses.map((item, index) => (
        <div
          key={index}
          className="w-96 lg:w-1/2 bg-white px-6 py-2 mb-3 rounded-lg"
        >
          <div>
            <p>Year: {item.teachingYear}</p>
            <p>Postgraduate Courses: {item.postgradCourses}</p>
            <p>Undergraduate Courses: {item.undergradCourses}</p>
          </div>
          <div>
            <Button onClick={() => handleUpdate(item)}>Edit</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Courses;
