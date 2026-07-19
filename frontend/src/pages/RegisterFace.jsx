import DashboardLayout from "../layouts/DashboardLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { registerFace } from "../api/fastApi";

function RegisterFace() {
  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state?.student;
  console.log(location.state);
  console.log(student);
  const handleRegisterFace = async () => {
    try {
      const response = await registerFace(student.id);
      alert(response.message || "Face registered successfully!");
    } catch (error) {
      console.error(error);
      alert("Face recognition failed");
    }
  };

  if (!student) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-xl shadow p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            No Student Selected
          </h2>

          <p className="mb-6">
            Please select a student from the Students page.
          </p>

          <button
            onClick={() => navigate("/students")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Back to Students
          </button>
          <button
            onClick={handleRegisterFace}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Start Registration
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Register Face</h1>
        <button
          onClick={() => navigate("/students")}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Back
        </button>
      </div>
      <div className="bg-white rounded-xl shadow p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">{student.name}</h2>
          <p className="text-gray-600">Roll Number:{student.roll_number}</p>
          <p className="text-gray-600">Department:{student.department}</p>
          <p className="text-gray-600">Year:{student.year}</p>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-xl h-96 flex items-center justify-center">
          <p className="text-gray-500 text-lg">Camera preview coming soon...</p>
        </div>
        <div className="mt-8 flex gap-4">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg">
            Start Camera
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            Capture Face
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default RegisterFace;
