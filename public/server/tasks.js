const form = document.getElementById("taskForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const taskName = document.getElementById("taskName").value;
  const taskDescription = document.getElementById("taskDescription").value;
  const taskStatus = document.getElementById("taskStatus").value;

  const taskObj = {
    name: taskName,
    description: taskDescription,
    status: taskStatus
  };

  console.log("Submitted Task:", taskObj);
  alert("Task submitted! Check console for details.");
  
  
});


  