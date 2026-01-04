import api from "./axios";

export const getCourses = () => api.get("/courses");
export const getCourseById = (id) => api.get(`/course/${id}`);
export const createCourse = (data) => api.post("/courses", data);
export const updateCourse = (id, data) => api.put(`/course/${id}`, data);
export const deleteCourse = (id) => api.delete(`/course/${id}`);
