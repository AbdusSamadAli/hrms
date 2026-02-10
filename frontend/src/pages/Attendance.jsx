import { useState, useEffect } from "react";
import { markAttendance, getAttendance } from "../api/api";

export default function Attendance() {
  const [employeeId, setEmployeeId] = useState(
    localStorage.getItem("employeeId") || ""
  );
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

  async function loadAttendance(id) {
    try {
      const data = await getAttendance(id);
      setRecords(data);
    } catch {
      setError("Failed to load attendance");
    }
  }

  async function submit() {
    setError("");
    try {
      await markAttendance({ employee_id: employeeId, date, status });
      loadAttendance(employeeId);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    if (employeeId) {
      localStorage.setItem("employeeId", employeeId);
      loadAttendance(employeeId);
    }
  }, [employeeId]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Attendance Management</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white shadow rounded p-6 mb-8">
        <h3 className="text-lg font-medium mb-4">Mark Attendance</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            className="border rounded p-2"
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <input
            type="date"
            className="border rounded p-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select
            className="border rounded p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Present</option>
            <option>Absent</option>
          </select>
          <button
            onClick={submit}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4"
          >
            Mark
          </button>
        </div>
      </div>

      {records.length > 0 && (
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-lg font-medium mb-4">Attendance Records</h3>

          <ul className="space-y-2">
            {records.map((r) => (
              <li key={r.id} className="flex justify-between border rounded p-2">
                <span>{r.date}</span>
                <span
                  className={
                    r.status === "Present"
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {r.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
