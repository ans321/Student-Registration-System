// Initializing records from localStorage
document.addEventListener("DOMContentLoaded", loadStudents);

const form = document.getElementById("registrationForm");
const tableBody = document.querySelector("#studentTable tbody");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  if (!validateInput(name, studentId, email, contact)) return;

  const student = { name, studentId, email, contact };
  saveStudent(student);
  appendStudentToTable(student);
  form.reset();
});

// Input validation function
function validateInput(name, studentId, email, contact) {
  const nameRegex = /^[a-zA-Z\s]+$/;
  const numberRegex = /^[0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !studentId || !email || !contact) {
    alert("All fields are required.");
    return false;
  }

  if (!nameRegex.test(name)) {
    alert("Name must contain only letters.");
    return false;
  }

  if (!numberRegex.test(studentId) || !numberRegex.test(contact)) {
    alert("Student ID and Contact No must be numbers.");
    return false;
  }

  if (!emailRegex.test(email)) {
    alert("Enter a valid email address.");
    return false;
  }

  return true;
}

// Save student to localStorage
function saveStudent(student) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
}

// Load existing students
function loadStudents() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.forEach(appendStudentToTable);
}

// Append student to table
function appendStudentToTable(student, index = null) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${student.name}</td>
    <td>${student.studentId}</td>
    <td>${student.email}</td>
    <td>${student.contact}</td>
    <td>
      <button class="action-btn edit-btn">Edit</button>
      <button class="action-btn delete-btn">Delete</button>
    </td>
  `;

  // Handle edit
  row.querySelector(".edit-btn").addEventListener("click", () => {
    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;

    deleteStudent(student.studentId);
    row.remove();
  });

  // Handle delete
  row.querySelector(".delete-btn").addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this record?")) {
      deleteStudent(student.studentId);
      row.remove();
    }
  });

  tableBody.appendChild(row);
}

// Delete student by ID
function deleteStudent(studentId) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  students = students.filter((s) => s.studentId !== studentId);
  localStorage.setItem("students", JSON.stringify(students));
}
