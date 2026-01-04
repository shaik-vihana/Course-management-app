import { useEffect, useState } from "react";
import { getCourseById, updateCourse } from "../api/courseApi";
import { useNavigate, useParams } from "react-router-dom";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    course_name: "",
    description: "",
    instructor: "",
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await getCourseById(id);
        setForm(res.data);
      } catch {
        alert("Failed to load course");
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCourse(id, form);
      navigate("/courses");
    } catch {
      alert("Update failed");
    }
  };

  return (
    <div>
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="course_name"
          value={form.course_name}
          onChange={handleChange}
        />
        <input
          name="instructor"
          value={form.instructor}
          onChange={handleChange}
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditCourse;
