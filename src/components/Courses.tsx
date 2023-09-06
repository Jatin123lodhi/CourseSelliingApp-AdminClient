import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICourseDetails } from "./CourseDetails";
import { useCourseAPI } from "../services/useCourseAPI";

const Courses = () => {
  //states
  const [courses, setCourses] = useState<ICourseDetails[]>([]);

  //hooks
  const { getCourses } = useCourseAPI();

  //functions
  const getAllCourses = async () => {
    try {
      const res = await getCourses();
      console.log(res?.data);
      setCourses(res?.data.courses);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <div>
      <div className="text-2xl text-gray-600 font-semibold text-center my-4">
        Courses
      </div>
      <div className="flex flex-wrap gap-4 p-2 justify-center item">
        {courses.map((c) => (
          <Course course={c} key={c?._id} />
        ))}
      </div>
    </div>
  );
};

interface ICourseProps {
  course: ICourseDetails;
}

export const Course = (props: ICourseProps) => {
  const { course } = props;
  return (
    <Link to={`/course/${course?._id}`}>
      <div className=" w-[300px] h-[300px] bg-white shadow-lg flex flex-col items-center rounded py-4 px-4">
        <div className=" w-full h-[160px]">
          <img
            className="h-[160px]"
            src={course?.imageLink}
            alt="courseImage"
          />
        </div>
        <div className="text-xl font-semibold w-full line-clamp-1 py-1">
          {course?.title}
        </div>
        <div className="line-clamp-2  w-full">{course?.description}</div>
        {/* <div><img src={course?.imageLink} alt="courseImage" className="w-[180px] rounded" /></div> */}
        <div className="font-semibold text-lg w-full">₹{course?.price}</div>
      </div>
    </Link>
  );
};
export default Courses;
