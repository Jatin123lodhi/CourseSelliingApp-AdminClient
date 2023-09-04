import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateCourseDialog from "./dialogs/UpdateCourseDialog";
import axios from "axios";
import DeleteCourseDialog from "./dialogs/DeleteCourseDialog";

export interface ICourseDetails{
  _id: string
  title: string
  description: string
  price: number
  imageLink: string
}

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<ICourseDetails>();

  const getCourseByCourseId = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/admin/course/${courseId} `,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setCourse(res?.data?.course);
      console.log(res?.data?.course)
    } catch (err) {
      console.log(err);
    }
  };

  const onCourseUpdateSuccess = () => {
    getCourseByCourseId();
  };

  useEffect(() => {
    getCourseByCourseId();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="border border-gray-400 h-max bg-gray-900 relative">
      {/* update course dialog and btn */}
      <div className="flex justify-end text-right text-white absolute top-3 right-6 sm:top-6 sm:right-12 ">
        <UpdateCourseDialog
          course={course}
          onCourseUpdateSuccess={() => {
            onCourseUpdateSuccess();
          }}
        />
      </div>

      {/* delete course dialog  and btn */}
      <div className="flex justify-end text-right text-white absolute top-3 right-14 sm:top-6 sm:right-20">
        <DeleteCourseDialog courseId={course?._id} />
      </div>

      <div className="lg:grid lg:grid-cols-6 ">

        {/* left part */}
        <div className="text-white lg:col-span-4  px-6 py-4 pt-10 sm:pt-4">
          <div className="text-2xl font-bold mb-2">{course?.title}</div>
          <div className="text-lg font-semibold">{course?.description}</div>
          <div className="text-2xl font-semibold mt-4">
            Price - Rs. {course?.price}
          </div>
        </div>

        {/* right part */}
        <div className="p-4  lg:p-12 flex justify-center lg:col-span-2 mt-2">
          <img
            src={course?.imageLink}
            alt="courseImage"
            className="rounded "
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
