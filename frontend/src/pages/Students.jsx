import { useState, useEffect } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import StudentTable from "../components/students/StudentTable";

import { getStudents } from "../api/studentApi";

function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudent() {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadStudent();
  }, []);
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Students</h1>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          + Add Student
        </button>
      </div>

      <StudentTable students={students} />
    </DashboardLayout>
  );
}
export default Students;
