import { useEffect, useState } from "react";
import { getEmployees, addEmployee, deleteEmployee } from "../api/api";
import Loader from "../components/Loader";

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
    });

    async function loadEmployees() {
        setLoading(true);
        const data = await getEmployees();
        setEmployees(data);
        setLoading(false);
    }

    useEffect(() => {
        loadEmployees();
    }, []);

    async function submit() {
        setError("");
        try {
            await addEmployee(form);
            setForm({ employee_id: "", full_name: "", email: "", department: "" });
            loadEmployees();
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6">Employee Management</h2>

            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="bg-white shadow rounded p-6 mb-8">
                <h3 className="text-lg font-medium mb-4">Add New Employee</h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        className="border rounded p-2"
                        placeholder="Employee ID"
                        value={form.employee_id}
                        onChange={(e) =>
                            setForm({ ...form, employee_id: e.target.value })
                        }
                    />
                    <input
                        className="border rounded p-2"
                        placeholder="Full Name"
                        value={form.full_name}
                        onChange={(e) =>
                            setForm({ ...form, full_name: e.target.value })
                        }
                    />
                    <input
                        className="border rounded p-2"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />
                    <input
                        className="border rounded p-2"
                        placeholder="Department"
                        value={form.department}
                        onChange={(e) =>
                            setForm({ ...form, department: e.target.value })
                        }
                    />
                </div>

                <button
                    onClick={submit}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                >
                    Add Employee
                </button>
            </div>

            <div className="bg-white shadow rounded p-6">
                <h3 className="text-lg font-medium mb-4">Employee List</h3>

                {loading ? (
                    <Loader />
                ) : employees.length === 0 ? (
                    <p className="text-gray-500">No employees added yet.</p>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b text-left">
                                <th className="py-2">ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th className="text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp) => (
                                <tr key={emp.employee_id} className="border-b">
                                    <td className="py-2">{emp.employee_id}</td>
                                    <td>{emp.full_name}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.department}</td>
                                    <td className="text-right">
                                        <button
                                            className="text-red-600 hover:underline"
                                            onClick={async () => {
                                                await deleteEmployee(emp.employee_id);
                                                loadEmployees();
                                            }}
                                        >
                                            Delete
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div >
    );
}
