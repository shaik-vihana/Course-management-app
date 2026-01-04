import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import CourseList from "./courses/CourseList";
import AddCourse from "./courses/AddCourse";
import EditCourse from "./courses/EditCourse";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <CourseList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses/add"
        element={
          <ProtectedRoute>
            <AddCourse />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses/edit/:id"
        element={
          <ProtectedRoute>
            <EditCourse />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
