import axios from "axios";

const API_BASE_URL = "http://localhost:8085";

const table = document.getElementById("student-table");

const studentTableBody = document.getElementById("student-table-body");

document.addEventListener("DOMContentLoaded", loadStudents);

const loadStudents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/students`);
    if (response.status === 200) {
      const students = response.data;
      console.log(students);
      studentTableBody.innerHTML = "";
      students.forEach((std) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${std.name}</td>
        <td>${std.studentName}</td>
        <td>${std.detail.address}</td>
        <td>${std.detail.phoneNumber}</td>
        <td>${std.detail.email}</td>
        <td>${std.detail.dateOfBirth}</td>
        `;
      });
      studentTableBody.appendChild(row);
    }
  } catch (error) {
    console.error("Error Loading students:", error);
  }
};
