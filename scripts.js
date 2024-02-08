// Function to display saved student details
function displaySavedStudentDetails() {
  const savedStudentDetails = JSON.parse(localStorage.getItem("studentDetails")) || [];
  const tableBody = document.getElementById("studentTableBody");
  tableBody.innerHTML = ""; // Clear existing rows

  savedStudentDetails.forEach(student => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.registerNumber}</td>
      <td>${student.emis}</td>
      <td>${student.admissionNumber}</td>
      <td>${student.dob}</td>
      <td>${student.gmail}</td>
      <td>${student.dateOfJoin}</td>
      <td>${student.dateOfLeave}</td>
      <td><img src="${student.photo}" alt="Student Photo"></td>
    `;
    tableBody.appendChild(newRow);
  });
}

// Display saved student details on page load
window.onload = displaySavedStudentDetails;

document.getElementById("photo").addEventListener("change", function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById("preview").setAttribute("src", e.target.result);
    }
    reader.readAsDataURL(file);
  }
});

document.getElementById("studentForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const registerNumber = document.getElementById("registerNumber").value;
  const emis = document.getElementById("emis").value;
  const admissionNumber = document.getElementById("admissionNumber").value;
  const dob = document.getElementById("dob").value;
  const gmail = document.getElementById("gmail").value;
  const dateOfJoin = document.getElementById("dateOfJoin").value;
  const dateOfLeave = document.getElementById("dateOfLeave").value;
  const photo = document.getElementById("photo").files[0];

  // Save student details to local storage
  const student = {
    name: name,
    age: age,
    registerNumber: registerNumber,
    emis: emis,
    admissionNumber: admissionNumber,
    dob: dob,
    gmail: gmail,
    dateOfJoin: dateOfJoin,
    dateOfLeave: dateOfLeave,
    photo: URL.createObjectURL(photo)
  };

  let savedStudentDetails = JSON.parse(localStorage.getItem("studentDetails")) || [];
  savedStudentDetails.push(student);
  localStorage.setItem("studentDetails", JSON.stringify(savedStudentDetails));

  // Update table to display newly added student details
  displaySavedStudentDetails();

  // Reset form
  this.reset();
  document.getElementById("preview").setAttribute("src", "#");

  alert("Student details added successfully!");
});
