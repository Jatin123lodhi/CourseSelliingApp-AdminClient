import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { ICourseDetails } from "../components/CourseDetails";

export const headers = {
  Authorization: "Bearer " + localStorage.getItem("token"),
};

export const useCourseAPI = () => {
  const getCourseDetailsById = async (courseId: string) => {
    const res = await axios.get(`${BASE_URL}/course/${courseId} `, {
      headers,
    });
    return res;
  };

  const updateCourse = async (payload: ICourseDetails) => {
    const res = await axios.put(`${BASE_URL}courses/${payload?._id}`, payload, {
      headers,
    });
    return res;
  };

  const deleteCourse = async (courseId: string) => {
    const res = await axios.delete(`${BASE_URL}/course/${courseId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return res;
  };

  const createCourse = async (payload: ICreateCoursePayload) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const res = await axios.post(`${BASE_URL}/courses`, payload, { headers });
    return res;
  };

  const getCourses = async () => {
    const res = await axios.get(`${BASE_URL}/courses`, {
      headers,
    });
    return res;
  };

  return {
    getCourseDetailsById,
    updateCourse,
    deleteCourse,
    createCourse,
    getCourses,
  };
};

export interface ICreateCoursePayload {
  title: string;
  description: string;
  price: number;
  imageLink: string;
}
