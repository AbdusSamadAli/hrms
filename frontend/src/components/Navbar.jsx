export default function Navbar({ page, setPage }) {
  return (
    <nav className="bg-blue-600 text-white p-4 flex gap-6">
      <button onClick={() => setPage("employees")} className="font-semibold">
        Employees
      </button>
      <button onClick={() => setPage("attendance")} className="font-semibold">
        Attendance
      </button>
    </nav>
  );
}
