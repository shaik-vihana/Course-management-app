import { useEffect, useState } from "react";
import { getCourses, deleteCourse } from "../api/courseApi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const { logout } = useAuth();

  const fetchCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data);
    } catch (err) {
      alert("Failed to fetch courses");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await deleteCourse(id);
      fetchCourses();
    } catch {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Courses</h2>
      <button onClick={logout}>Logout</button>
      <br />
      <Link to="/courses/add">Add Course</Link>

      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <b>{course.course_name}</b> – {course.instructor}
            <br />
            <Link to={`/courses/edit/${course.id}`}>Edit</Link>
            {" | "}
            <button onClick={() => handleDelete(course.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
