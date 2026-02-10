const BASE_URL = "https://hrms-1-1lm3.onrender.com";

export async function getEmployees() {
  const res = await fetch(`${BASE_URL}/employees`);
  return res.json();
}

export async function addEmployee(data) {
  const res = await fetch(`${BASE_URL}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to add employee");
  }

  return res.json();
}

export async function deleteEmployee(employeeId) {
  await fetch(`${BASE_URL}/employees/${employeeId}`, {
    method: "DELETE",
  });
}

export async function markAttendance(data) {
  const res = await fetch(`${BASE_URL}/attendance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail);
  }

  return res.json();
}

export async function getAttendance(employeeId) {
  const res = await fetch(`${BASE_URL}/attendance/${employeeId}`);
  return res.json();
}
