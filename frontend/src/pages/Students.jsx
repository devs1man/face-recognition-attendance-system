import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getStudents } from "../api/studentApi";

function Students() {
  const [students, setStudents] = useEffect([]);

  useEffect(() => {
    async function loadStudents() {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadStudents();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Students</h1>

      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Roll Number</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Department</th>
              <th className="text-left p-3">Year</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((students) => (
              <tr key={student.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{student.roll_number}</td>

                <td className="p-3">{student.name}</td>

                <td className="p-3">{student.department}</td>

                <td className="p-3">{student.year}</td>

                <td className="p-3 flex gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>

                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>

                  <button className="bg-green-500 text-white px-3 py-1 rounded">
                    Register Face
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
export default Students;
