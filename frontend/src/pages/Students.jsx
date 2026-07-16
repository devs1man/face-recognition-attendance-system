import { useState, useEffect } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import StudentTable from "../components/students/StudentTable";
import StudentModal from "../components/students/StudentModal";
import StudentForm from "../components/students/StudentForm";
import { getStudents, createStudent } from "../api/studentApi";

function Students() {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loadStudent = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateStudent = async (studentData) => {
    try {
      await createStudent(studentData);
      setIsModalOpen(false);
      await loadStudent();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadStudent();
  }, []);
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Students</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2   rounded-lg hover:bg-blue-700"
        >
          + Add Student
        </button>
      </div>

      <StudentTable students={students} />
      <StudentModal
        isOpen={isModalOpen}
        title="Add Student"
        onCLose={() => setIsModalOpen(false)}
      >
        <StudentForm
          onSubmit={handleCreateStudent}
          onCancel={() => setIsModalOpen(false)}
        />
      </StudentModal>
    </DashboardLayout>
  );
}
export default Students;
