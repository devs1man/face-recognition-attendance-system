import { useState } from "react";

function StudentForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    roll_number: "",
    name: "",
    department: "",
    year: "",
    email: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="roll_number"
        value={formData.roll_number}
        onChange={handleChange}
        placeholder="roll number"
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="name"
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="deaprtment"
        className="w-full border rounded-lg p-3"
      />

      <input
        type="number"
        name="year"
        value={formData.year}
        onChange={handleChange}
        placeholder="year"
        className="w-full border rounded-lg p-3"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="email"
        className="w-full border rounded-lg p-3"
      />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg"
        >
          Save
        </button>
      </div>
    </form>
  );
}
export default StudentForm;
