import { useState, useEffect } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import StudentTable from "../components/students/StudentTable";
import StudentModal from "../components/students/StudentModal";
import StudentForm from "../components/students/StudentForm";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../api/studentApi";
import DeleteStudentModal from "../components/students/DeleteStudentModal";

function Students() {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const loadStudent = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setDeleteModalOpen(true);
  };

  const handleDeleteStudent = async () => {
    try {
      await deleteStudent(studentToDelete.id);
      await loadStudent();
      setDeleteModalOpen(false);
      setStudentToDelete(null);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSaveStudent = async (formData) => {
    if (selectedStudent) {
      await updateStudent(selectedStudent.id, formData);
    } else {
      await createStudent(formData);
    }
    await loadStudent();
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
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

      <StudentTable
        onEdit={handleEdit}
        students={students}
        onDelete={handleDeleteClick}
      />
      <StudentModal
        isOpen={isModalOpen}
        title={selectedStudent ? "Edit Student" : "Add Student"}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStudent(null);
        }}
      >
        <StudentForm
          initialData={selectedStudent}
          onSubmit={handleSaveStudent}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedStudent(null);
          }}
        />
      </StudentModal>
      <DeleteStudentModal
        isOpen={deleteModalOpen}
        student={studentToDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setStudentToDelete(null);
        }}
        onConfirm={handleDeleteStudent}
      />
    </DashboardLayout>
  );
}
export default Students;
