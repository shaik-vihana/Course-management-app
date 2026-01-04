import { useState } from "react";
import { createCourse } from "../api/courseApi";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [form, setForm] = useState({
    course_name: "",
    description: "",
    instructor: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCourse(form);
      navigate("/courses");
    } catch {
      alert("Failed to create course");
    }
  };

  return (
    <div>
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="course_name"
          placeholder="Course Name"
          onChange={handleChange}
        />
        <input
          name="instructor"
          placeholder="Instructor"
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddCourse;
