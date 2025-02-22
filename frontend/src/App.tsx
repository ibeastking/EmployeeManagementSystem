import React, { useState, useEffect } from "react";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
}

const API_URL = "http://localhost:8080/ems";

const App: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: 0,
    name: "",
    email: "",
    department: "",
    position: "",
  });

  //* Fetch Employees on Load
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${API_URL}/read`);
        if (!response.ok) throw new Error("Failed to fetch employees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  //* Add Employee
  const handleAdd = async () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.department || !newEmployee.position) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) throw new Error("Failed to add employee");

      setEmployees([...employees, { ...newEmployee, id: employees.length + 1 }]);
      setNewEmployee({ id: 0, name: "", email: "", department: "", position: "" });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  //* Delete Employee
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete employee");
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  //* Update Employee
  const handleUpdate = async (id: number) => {
    const updatedName = prompt("Enter new name:");
    if (!updatedName) return;

    try {
      const response = await fetch(`${API_URL}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name: updatedName }),
      });

      if (!response.ok) throw new Error("Failed to update employee");

      setEmployees(employees.map(emp => (emp.id === id ? { ...emp, name: updatedName } : emp)));
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Employee Management</h1>

      <div className="mb-4 space-y-2">
        <input type="text" placeholder="Name" value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} className="p-2 border rounded w-full" />
        <input type="email" placeholder="Email" value={newEmployee.email} onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} className="p-2 border rounded w-full" />
        <input type="text" placeholder="Department" value={newEmployee.department} onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })} className="p-2 border rounded w-full" />
        <input type="text" placeholder="Position" value={newEmployee.position} onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })} className="p-2 border rounded w-full" />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">Add Employee</button>
      </div>

      <table className="w-full bg-white shadow-md rounded border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Department</th>
            <th className="p-2 border">Position</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} className="text-center">
              <td className="p-2 border">{emp.id}</td>
              <td className="p-2 border">{emp.name}</td>
              <td className="p-2 border">{emp.email}</td>
              <td className="p-2 border">{emp.department}</td>
              <td className="p-2 border">{emp.position}</td>
              <td className="p-2 border">
                <button onClick={() => handleUpdate(emp.id)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Update</button>
                <button onClick={() => handleDelete(emp.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
