import { useState } from "react";
import Navbar from "./components/Navbar";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

function App() {
  const [page, setPage] = useState("employees");

  return (
    <>
      <Navbar page={page} setPage={setPage} />
      {page === "employees" ? <Employees /> : <Attendance />}
    </>
  );
}

export default App;
