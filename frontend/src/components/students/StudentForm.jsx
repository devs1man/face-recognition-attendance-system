function StudentForm() {
  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Roll Number"
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Name"
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Department"
        className="w-full border rounded-lg p-3"
      />

      <input
        type="number"
        placeholder="Year"
        className="w-full border rounded-lg p-3"
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full border rounded-lg p-3"
      />

      <div className="flex justify-end gap-3">
        <button type="button" className="px-5 py-2 border rounded-lg">
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
