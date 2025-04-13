const taskForm = document.getElementById("taskForm");
const taskName = document.getElementById("taskName");
const taskDescription = document.getElementById("taskDescription");
const taskStatus = document.getElementById("taskStatus");

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const task = {
    name: taskName.value,
    description: taskDescription.value,
    status: taskStatus.value
  };

  console.log("Task submitted:", task);
});







  